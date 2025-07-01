export const PRICING_CYCLES = ["monthly", "yearly", "threeYear"] as const;
export type BillingCycle = typeof PRICING_CYCLES[number];
