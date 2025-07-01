'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { PRICING_CYCLES, type BillingCycle } from "./constants";

export default function BillingCycleTabs({ billingCycle }: { billingCycle: BillingCycle }) {
  return (
    <Tabs defaultValue={billingCycle} className="max-w-md mx-auto w-full px-6 md:px-2 lg:px-0">
      <TabsList className="grid grid-cols-3 w-full">
        {PRICING_CYCLES.map((cycle) => (
          <TabsTrigger key={cycle} value={cycle} asChild>
            <Link
              href={`?billingCycle=${cycle}`}
              className={billingCycle === cycle ? "font-bold" : ""}
              aria-label={`Switch to ${cycle} billing cycle`}
            >
              {cycle === "monthly" ? "Monthly" : cycle === "yearly" ? "Yearly" : "3-Year"}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}