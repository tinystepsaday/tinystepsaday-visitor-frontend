/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, CheckCircle } from "lucide-react";
import Link from "next/link";

const AccountAndBilling = () => {
  // In a real app, you'd fetch this from localStorage or backend
  const [subscriptionType, setSubscriptionType] = useState("transformation"); // free, starter, transformation, complete
  const [billingCycle, setBillingCycle] = useState("yearly"); // monthly, yearly, threeYear

  const getSubscriptionFeatures = () => {
    switch (subscriptionType) {
      case "starter":
        return [
          { name: "15 blog posts per month", included: true },
          { name: "Full course access", included: true },
          { name: "Complete streak tracking", included: true },
          { name: "Community membership", included: true },
          { name: "Email & chat support", included: true },
          { name: "2 Mentorship sessions per quarter", included: true },
          { name: "Basic assessment", included: true },
          { name: "Starter growth plan", included: true },
          { name: "Priority support", included: false },
          { name: "VIP resources & workshops", included: false },
        ];
      case "transformation":
        return [
          { name: "Unlimited blog posts", included: true },
          { name: "Premium course access with instructor feedback", included: true },
          { name: "Advanced streak features", included: true },
          { name: "Community leadership access", included: true },
          { name: "Priority support", included: true },
          { name: "4 Mentorship sessions per quarter", included: true },
          { name: "Comprehensive assessment", included: true },
          { name: "Customized growth plan", included: true },
          { name: "Event ticket discounts (25% off)", included: true },
          { name: "101 sessions with facilitators (Quarterly)", included: true },
        ];
      case "complete":
        return [
          { name: "Unlimited blog posts", included: true },
          { name: "VIP course access with personalized 1-on-1 tutoring", included: true },
          { name: "All streak features with retrospective analysis", included: true },
          { name: "VIP community status", included: true },
          { name: "24/7 premium support", included: true },
          { name: "Unlimited mentorship sessions", included: true },
          { name: "In-depth assessments with progress tracking", included: true },
          { name: "Transformational roadmap with quarterly reviews", included: true },
          { name: "Free event tickets (4 per year)", included: true },
          { name: "Emergency sessions available on-demand", included: true },
        ];
      default: // free
        return [
          { name: "5 blog posts per month", included: true },
          { name: "Basic course access", included: true },
          { name: "Limited streak tracking", included: true },
          { name: "Community forum access", included: true },
          { name: "Email support", included: true },
          { name: "Mentorship sessions", included: false },
          { name: "Personalized assessment", included: false },
          { name: "Growth plan", included: false },
          { name: "Priority support", included: false },
          { name: "VIP resources & workshops", included: false },
        ];
    }
  };

  const getSubscriptionPrice = () => {
    const prices = {
      free: { monthly: 0, yearly: 0, threeYear: 0 },
      starter: { monthly: 19.99, yearly: 199.90, threeYear: 539.73 },
      transformation: { monthly: 49.99, yearly: 479.90, threeYear: 1259.73 },
      complete: { monthly: 99.99, yearly: 959.90, threeYear: 2519.73 }
    };
    return prices[subscriptionType as keyof typeof prices][billingCycle as keyof typeof prices.free];
  };

  const getSubscriptionName = () => {
    const names = {
      free: "Free",
      starter: "Starter",
      transformation: "Transformation",
      complete: "Complete"
    };
    return names[subscriptionType as keyof typeof names];
  };

  const getBillingPeriod = () => {
    switch (billingCycle) {
      case "yearly":
        return "Annual";
      case "threeYear":
        return "3-Year";
      default:
        return "Monthly";
    }
  };

  const getNextBillingDate = () => {
    const date = new Date();
    if (billingCycle === "yearly") {
      date.setFullYear(date.getFullYear() + 1);
    } else if (billingCycle === "threeYear") {
      date.setFullYear(date.getFullYear() + 3);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // In a real app, this would fetch payment history from localStorage or backend
  const paymentHistory = [
    {
      id: "INV-2025-001",
      date: "April 15, 2025",
      amount: getSubscriptionPrice(),
      status: "Paid",
      description: `${getSubscriptionName()} Plan - ${getBillingPeriod()}`
    }
  ];

  return (
    <div>
      <Tabs defaultValue="subscription">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8">
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Your Subscription</CardTitle>
                <Badge className={
                  subscriptionType === "free" ? "bg-gray-500" :
                  subscriptionType === "starter" ? "bg-blue-500" :
                  subscriptionType === "transformation" ? "bg-purple-500" :
                  "bg-green-500"
                }>
                  {getSubscriptionName()} Plan
                </Badge>
              </div>
              <CardDescription>
                {subscriptionType === "free" 
                  ? "You're currently on our Free plan. Upgrade to unlock more features." 
                  : `You're subscribed to our ${getSubscriptionName()} plan with ${getBillingPeriod().toLowerCase()} billing.`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {subscriptionType !== "free" && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Current billing cycle</span>
                    <span className="font-medium">{getBillingPeriod()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Amount</span>
                    <span className="font-medium">${getSubscriptionPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next billing date</span>
                    <span className="font-medium">{getNextBillingDate()}</span>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="font-medium mb-4">Your Plan Features</h3>
                <ul className="space-y-3">
                  {getSubscriptionFeatures().map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className={`h-5 w-5 mr-2 ${feature.included ? 'text-green-500' : 'text-gray-300'}`} />
                      <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                {subscriptionType === "free" ? (
                  <Button asChild className="w-full">
                    <Link href="/pricing">Upgrade Plan</Link>
                  </Button>
                ) : (
                  <>
                    <Button asChild className="flex-1">
                      <Link href="/checkout">Manage Subscription</Link>
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Cancel Subscription
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-4">Payment Methods</h3>
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Billing Address</h3>
                <div className="border rounded-lg p-4">
                  <div className="space-y-1">
                    <p>John Doe</p>
                    <p>123 Main Street</p>
                    <p>Apt 4B</p>
                    <p>San Francisco, CA 94103</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex gap-4">
                <Button variant="outline">Add Payment Method</Button>
                <Button variant="outline">Update Billing Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View and download your payment receipts</CardDescription>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                    <div>Invoice</div>
                    <div>Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  <Separator />
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="grid grid-cols-4 p-3 text-sm items-center">
                      <div>{payment.id}</div>
                      <div>{payment.date}</div>
                      <div>${payment.amount.toFixed(2)}</div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {payment.status}
                        </Badge>
                        <Button variant="ghost" size="sm">Download</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No payment history available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountAndBilling;
