import {
  corsPreflight,
  getSubscriptionForUser,
  isActiveSubscription,
  json,
  userFromAuthHeader,
} from "../lib/shared";

export default async (request: Request) => {
  if (request.method === "OPTIONS") return corsPreflight();
  if (request.method !== "GET") return json({ error: "Method not allowed" }, 405);

  const user = await userFromAuthHeader(request);
  if (!user) return json({ authenticated: false, active: false }, 401);

  try {
    const subscription = await getSubscriptionForUser(user.id);
    const active = isActiveSubscription(subscription?.status);
    return json({
      authenticated: true,
      active,
      status: subscription?.status ?? "inactive",
      planTier: subscription?.plan_tier ?? null,
      currentPeriodEnd: subscription?.current_period_end ?? null,
      email: user.email,
      userId: user.id,
    });
  } catch (error) {
    console.error("subscription-status", error);
    return json({ error: "Unable to load subscription" }, 500);
  }
};
