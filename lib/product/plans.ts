export type PlanTier = "monthly" | "annual";

export interface PlanDefinition {
  tier: PlanTier;
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  badge?: string;
  trialLabel: string;
}

/** Vogue-style: monthly + annual with 1-week free trial. */
export const PLANS: PlanDefinition[] = [
  {
    tier: "annual",
    title: "Annual",
    price: "$19.99",
    period: "Per year",
    popular: true,
    badge: "Save 67%",
    trialLabel: "Try 1 week free, then $19.99 / year",
    features: [
      "Full podcast library",
      "Subscriber-only episodes",
      "Saved reports library",
      "Early access to new investigations",
    ],
  },
  {
    tier: "monthly",
    title: "Monthly",
    price: "$4.99",
    period: "Per month",
    trialLabel: "Try 1 week free, then $4.99 / month",
    features: [
      "Full podcast library",
      "Subscriber-only episodes",
      "Saved reports library",
      "Early access to new investigations",
    ],
  },
];

export const ACTIVE_STATUSES = new Set(["active", "trialing"]);

/** Stripe Checkout trial length (days). */
export const STRIPE_TRIAL_DAYS = 7;
