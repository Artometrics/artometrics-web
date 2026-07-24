import {
  adminSupabase,
  corsPreflight,
  getSubscriptionForUser,
  isActiveSubscription,
  json,
  priceIdForTier,
  requirePublicEnv,
  stripeClient,
  userFromAuthHeader,
} from "../lib/shared";

/** Keep in sync with STRIPE_TRIAL_DAYS in lib/product/plans.ts */
const STRIPE_TRIAL_DAYS = 7;

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  let body: { tier?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const tier = body.tier?.toLowerCase();
  const priceId = tier ? priceIdForTier(tier) : null;
  if (!tier || !priceId) {
    return json({ error: "Invalid plan tier" }, 400);
  }

  const siteUrl = requirePublicEnv(
    "EXPO_PUBLIC_SITE_URL",
    "PUBLIC_SITE_URL",
  ).replace(/\/$/, "");
  const stripe = stripeClient();
  const supabase = adminSupabase();

  try {
    let subscription = await getSubscriptionForUser(user.id);
    if (isActiveSubscription(subscription?.status)) {
      return json(
        { error: "You already have an active membership. Manage it from Account." },
        409,
      );
    }

    let customerId = subscription?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email ?? undefined,
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await supabase
        .from("subscriptions")
        .upsert(
          {
            user_id: user.id,
            stripe_customer_id: customerId,
            status: subscription?.status ?? "inactive",
          },
          { onConflict: "user_id" }
        );
    }

    // One free trial per customer — skip if they already started a Stripe sub.
    const offerTrial = !subscription?.stripe_subscription_id;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/account/?checkout=success`,
      cancel_url: `${siteUrl}/pricing/?checkout=canceled`,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id, plan_tier: tier },
      subscription_data: {
        ...(offerTrial ? { trial_period_days: STRIPE_TRIAL_DAYS } : {}),
        metadata: { supabase_user_id: user.id, plan_tier: tier },
      },
    });

    return json({ url: session.url });
  } catch (error) {
    console.error("create-checkout", error);
    return json({ error: "Unable to start checkout" }, 500);
  }
};
