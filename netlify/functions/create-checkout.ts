import {
  adminSupabase,
  corsPreflight,
  getSubscriptionForUser,
  json,
  priceIdForTier,
  requireEnv,
  stripeClient,
  userFromAuthHeader,
} from "../lib/shared";

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

  const siteUrl = requireEnv("PUBLIC_SITE_URL").replace(/\/$/, "");
  const stripe = stripeClient();
  const supabase = adminSupabase();

  try {
    let subscription = await getSubscriptionForUser(user.id);
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

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/account/?checkout=success`,
      cancel_url: `${siteUrl}/pricing/?checkout=canceled`,
      client_reference_id: user.id,
      metadata: { supabase_user_id: user.id, plan_tier: tier },
      subscription_data: {
        metadata: { supabase_user_id: user.id, plan_tier: tier },
      },
    });

    return json({ url: session.url });
  } catch (error) {
    console.error("create-checkout", error);
    return json({ error: "Unable to start checkout" }, 500);
  }
};
