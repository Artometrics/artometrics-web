import Stripe from "stripe";
import { adminSupabase, requireEnv, stripeClient } from "../lib/shared";

function tierFromSubscription(sub: Stripe.Subscription): string | null {
  const meta = sub.metadata?.plan_tier;
  if (meta === "monthly" || meta === "annual") return meta;
  const priceId = sub.items.data[0]?.price?.id;
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_MONTHLY) return "monthly";
  if (priceId === process.env.STRIPE_PRICE_ANNUAL) return "annual";
  return null;
}

/** Stripe API 2025+: period lives on subscription items, not the Subscription root. */
function periodEndUnix(sub: Stripe.Subscription): number | null {
  const fromItem = sub.items?.data?.[0]?.current_period_end;
  if (typeof fromItem === "number") return fromItem;
  const legacy = (sub as { current_period_end?: number }).current_period_end;
  return typeof legacy === "number" ? legacy : null;
}

async function upsertSubscription(params: {
  userId: string;
  customerId?: string | null;
  subscriptionId?: string | null;
  status: string;
  planTier?: string | null;
  currentPeriodEnd?: number | null;
}) {
  const supabase = adminSupabase();
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: params.userId,
      stripe_customer_id: params.customerId ?? undefined,
      stripe_subscription_id: params.subscriptionId ?? undefined,
      status: params.status,
      plan_tier: params.planTier ?? undefined,
      current_period_end: params.currentPeriodEnd
        ? new Date(params.currentPeriodEnd * 1000).toISOString()
        : null,
    },
    { onConflict: "user_id" }
  );
  if (error) throw error;
}

export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const stripe = stripeClient();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      requireEnv("STRIPE_WEBHOOK_SECRET")
    );
  } catch (error) {
    console.error("stripe-webhook verify", error);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id ?? session.metadata?.supabase_user_id;
        if (!userId || !session.subscription) break;
        const sub = await stripe.subscriptions.retrieve(String(session.subscription));
        await upsertSubscription({
          userId,
          customerId: String(session.customer),
          subscriptionId: sub.id,
          status: sub.status,
          planTier: tierFromSubscription(sub),
          currentPeriodEnd: periodEndUnix(sub),
        });
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.supabase_user_id;
        if (!userId) break;
        await upsertSubscription({
          userId,
          customerId: String(sub.customer),
          subscriptionId: sub.id,
          status: event.type.endsWith("deleted") ? "canceled" : sub.status,
          planTier: tierFromSubscription(sub),
          currentPeriodEnd: periodEndUnix(sub),
        });
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("stripe-webhook handler", event.type, error);
    return new Response("Webhook handler failed", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
