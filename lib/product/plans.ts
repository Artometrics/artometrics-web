export type PlanTier = "listener" | "engager" | "collaborator";

export interface PlanDefinition {
  tier: PlanTier;
  title: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export const PLANS: PlanDefinition[] = [
  {
    tier: "listener",
    title: "Listener",
    price: "$4.99",
    period: "Per month",
    features: [
      "Full podcast library",
      "Subscriber-only episodes",
      "Weekly editorial highlights",
      "RSS + saved reading list",
    ],
  },
  {
    tier: "engager",
    title: "Engager",
    price: "$9.99",
    period: "Per month",
    popular: true,
    features: [
      "Everything in Listener",
      "Early access to new reports",
      "Ad-free reading experience",
      "Priority newsletter",
    ],
  },
  {
    tier: "collaborator",
    title: "Collaborator",
    price: "$14.99",
    period: "Per month",
    features: [
      "Everything in Engager",
      "Behind-the-scenes notes",
      "Member discussion access",
      "Creator collaboration tools",
    ],
  },
];

export const ACTIVE_STATUSES = new Set(["active", "trialing"]);
