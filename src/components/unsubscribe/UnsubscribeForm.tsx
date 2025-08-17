"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { unsubscribeFromNewsletter } from "@/lib/api/subscribers";
import { toast } from "sonner";

interface UnsubscribeFormProps {
  initialEmail: string;
  initialType: string;
}

const unsubscribeReasons = [
  { value: "TOO_MANY_EMAILS", label: "Too many emails" },
  { value: "NOT_RELEVANT", label: "Content not relevant to me" },
  { value: "SPAM", label: "Marked as spam" },
  { value: "PRIVACY_CONCERNS", label: "Privacy concerns" },
  { value: "NO_LONGER_INTERESTED", label: "No longer interested" },
  { value: "OTHER", label: "Other reason" },
];

const subscriptionTypes = [
  { value: "FOOTER", label: "Footer Newsletter" },
  { value: "MODAL", label: "Modal Newsletter" },
  { value: "BOOK_PUBLISH", label: "Book Publish Notifications" },
];

export function UnsubscribeForm({ initialEmail, initialType }: UnsubscribeFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState(initialEmail);
  const [subscriptionType, setSubscriptionType] = useState(initialType);
  const [unsubscribeReason, setUnsubscribeReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!subscriptionType) {
      setError("Please select a subscription type");
      return;
    }

    if (!unsubscribeReason) {
      setError("Please select a reason for unsubscribing");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await unsubscribeFromNewsletter({
        email: email.trim(),
        subscribingTo: subscriptionType as "FOOTER" | "MODAL" | "BOOK_PUBLISH",
        unsubscribeReason: unsubscribeReason as "TOO_MANY_EMAILS" | "NOT_RELEVANT" | "SPAM" | "PRIVACY_CONCERNS" | "NO_LONGER_INTERESTED" | "OTHER",
      });

      if (response.success) {
        setIsSuccess(true);
        toast.success("Successfully unsubscribed from newsletter");
      } else {
        setError(response.message || "Failed to unsubscribe. Please try again.");
        toast.error(response.message || "Failed to unsubscribe");
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
      setError("An error occurred. Please try again.");
      toast.error("Failed to unsubscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-600">Successfully Unsubscribed</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            You have been successfully unsubscribed from our newsletter. We&apos;re sorry to see you go!
          </p>
          <p className="text-sm text-muted-foreground">
            You will no longer receive emails from us. If you change your mind, you can always resubscribe at any time.
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() => router.push("/")}
            >
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <XCircle className="h-6 w-6 text-red-600" />
        </div>
        <CardTitle className="text-xl">Unsubscribe from Newsletter</CardTitle>
        <p className="text-muted-foreground">
          We&apos;re sorry to see you go. Please let us know why you&apos;re unsubscribing so we can improve.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2 hidden">
            <Label htmlFor="subscriptionType">Subscription Type</Label>
            <Select value={subscriptionType} onValueChange={setSubscriptionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select subscription type" />
              </SelectTrigger>
              <SelectContent>
                {subscriptionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unsubscribeReason">Reason for Unsubscribing</Label>
            <Select value={unsubscribeReason} onValueChange={setUnsubscribeReason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {unsubscribeReasons.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Unsubscribing..." : "Unsubscribe"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Changed your mind?{" "}
              <button
                type="button"
                onClick={() => router.push("/")}
                className="text-blue-600 hover:underline"
              >
                Return to home
              </button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 