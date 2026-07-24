import {
  corsPreflight,
  getSubscriptionForUser,
  json,
  requirePublicEnv,
  stripeClient,
  userFromAuthHeader,
} from "../lib/shared";

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const user = await userFromAuthHeader(request);
  if (!user) return json({ error: "Unauthorized" }, 401);

  const siteUrl = requirePublicEnv(
    "EXPO_PUBLIC_SITE_URL",
    "PUBLIC_SITE_URL",
  ).replace(/\/$/, "");
  const stripe = stripeClient();

  try {
    const subscription = await getSubscriptionForUser(user.id);
    if (!subscription?.stripe_customer_id) {
      return json({ error: "No billing profile yet" }, 400);
    }

    const portal = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${siteUrl}/account/`,
    });

    return json({ url: portal.url });
  } catch (error) {
    console.error("create-portal", error);
    return json({ error: "Unable to open billing portal" }, 500);
  }
};
