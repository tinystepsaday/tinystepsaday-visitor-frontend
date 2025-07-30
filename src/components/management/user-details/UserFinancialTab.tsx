"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, FileText, Download } from "lucide-react";
import { Payment, Subscription } from "./types";


export function UserFinancialTab() {
  // Dummy data for missing fields (to be replaced with real API calls later)
  const payments: Payment[] = [
    { id: "1", description: "Premium Subscription", amount: 29.99, status: "completed", paymentMethod: "Credit Card", createdAt: new Date(), transactionId: "TXN123" },
  ];

  const subscriptions: Subscription[] = [
    { id: "1", tier: "Premium", monthlyAmount: 29.99, status: "active", startDate: new Date(), endDate: null, autoRenew: true },
  ];

  const getTotalSpent = () => {
    return payments.reduce((total, payment) => total + payment.amount, 0);
  };

  const getActiveSubscriptions = () => {
    return subscriptions.filter(sub => sub.status === "active");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalSpent().toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Lifetime value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getActiveSubscriptions().length}</div>
            <p className="text-xs text-muted-foreground">Current plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
            <p className="text-xs text-muted-foreground">Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Purchases</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Digital products</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All financial transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <p className="text-sm text-muted-foreground">{payment.paymentMethod}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${payment.amount}</div>
                      <Badge className="bg-blue-100 text-blue-800">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{payment.createdAt.toLocaleDateString()}</span>
                    <span>{payment.transactionId}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscriptions</CardTitle>
            <CardDescription>Current and past subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{subscription.tier} Plan</h4>
                      <p className="text-sm text-muted-foreground">${subscription.monthlyAmount}/month</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {subscription.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Start Date</span>
                      <span>{subscription.startDate.toLocaleDateString()}</span>
                    </div>
                    {subscription.endDate && (
                      <div className="flex justify-between text-sm">
                        <span>End Date</span>
                        <span>{subscription.endDate.toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Auto Renew</span>
                      <span>{subscription.autoRenew ? "Yes" : "No"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 