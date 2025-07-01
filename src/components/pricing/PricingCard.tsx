import { Check } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BillingCycle } from "@/app/pricing/page";

export interface PricingFeature {
  name: string;
  included: boolean;
  details?: string;
}

export interface PricingTier {
  name: string;
  price: number;
  description: string;
  features: PricingFeature[];
  highlight?: boolean;
  billingOptions: {
    monthly: number;
    yearly: number;
    threeYear: number;
  };
  buttonText: string;
  recommended?: boolean;
}

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: BillingCycle;
}

const PricingCard = ({ tier, billingCycle }: PricingCardProps) => {
  const getBillingPrice = () => {
    switch (billingCycle) {
      case "yearly":
        return tier.billingOptions.yearly;
      case "threeYear":
        return tier.billingOptions.threeYear;
      default:
        return tier.billingOptions.monthly;
    }
  };

  const getSavingsPercentage = () => {
    if (billingCycle === "yearly") {
      const monthly = tier.billingOptions.monthly * 12;
      const yearly = tier.billingOptions.yearly;
      return Math.round((1 - yearly / monthly) * 100);
    } else if (billingCycle === "threeYear") {
      const monthly = tier.billingOptions.monthly * 36;
      const threeYear = tier.billingOptions.threeYear;
      return Math.round((1 - threeYear / monthly) * 100);
    }
    return 0;
  };

  const getBillingPeriod = () => {
    switch (billingCycle) {
      case "yearly":
        return "per year";
      case "threeYear":
        return "for 3 years";
      default:
        return "per month";
    }
  };

  const price = getBillingPrice();
  const savings = getSavingsPercentage();

  return (
    <Card
      className={`flex flex-col h-full transition-all ${
        tier.highlight ? "border-primary shadow-lg scale-105" : ""
      }`}
    >
      <CardHeader className="pb-8">
        {tier.recommended && (
          <div className="py-1 px-3 bg-primary text-primary-foreground text-xs font-medium rounded-full max-w-fit mb-2">
            Recommended
          </div>
        )}
        <CardTitle className="text-xl">{tier.name}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-3xl font-bold">${price.toFixed(2)}</span>
          <span className="ml-1 text-sm text-muted-foreground">{getBillingPeriod()}</span>
        </div>
        {savings > 0 && (
          <div className="mt-1 text-sm text-green-600 dark:text-green-400">
            Save {savings}% with this plan
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-4">{tier.description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className="mr-2 mt-0.5">
                <Check
                  className={`h-4 w-4 ${feature.included ? "text-green-500" : "text-muted-foreground"}`}
                  aria-hidden="true"
                />
              </div>
              <div>
                <span className={feature.included ? "text-foreground" : "text-muted-foreground"}>
                  {feature.name}
                </span>
                {feature.details && (
                  <p className="text-xs text-muted-foreground mt-0.5">{feature.details}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button
          asChild
          className="w-full"
          variant={tier.highlight ? "default" : "outline"}
          aria-label={`Select ${tier.name} plan with ${billingCycle} billing`}
        >
          <Link
            href={
              tier.name === "Free"
                ? "/signup"
                : `/checkout?tier=${encodeURIComponent(tier.name)}&cycle=${billingCycle}`
            }
          >
            {tier.buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;