"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, BookOpen, Eye } from "lucide-react";
import { Subscriber } from "@/lib/api/subscribers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const subscriptionTypeConfig = {
  FOOTER: { label: "Footer", icon: Mail, variant: "default" as const },
  MODAL: { label: "Modal", icon: Eye, variant: "secondary" as const },
  BOOK_PUBLISH: { label: "Book Publish", icon: BookOpen, variant: "outline" as const },
};

interface SubscriberDetailClientProps {
  subscriberId: string;
}

export function SubscriberDetailClient({ subscriberId }: SubscriberDetailClientProps) {
  const router = useRouter();
  const [subscriber] = useState<Subscriber | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriber = async () => {
      try {
        // For now, we'll show a placeholder since we need to add the getSubscriberById function
        // This would be implemented when we add the missing API functions
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching subscriber:", error);
        toast.error("Failed to fetch subscriber details");
        setIsLoading(false);
      }
    };

    fetchSubscriber();
  }, [subscriberId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading subscriber details...</div>
      </div>
    );
  }

  if (!subscriber) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="text-muted-foreground">Subscriber not found</div>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscriber Details</h1>
          <p className="text-muted-foreground">
            View and manage subscriber information
          </p>
        </div>
      </div>

      {/* Subscriber Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-lg">{subscriber.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subscription Type</label>
              <div className="mt-1">
                <Badge variant={subscriptionTypeConfig[subscriber.subscribingTo].variant}>
                  {subscriptionTypeConfig[subscriber.subscribingTo].label}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <div className="mt-1">
                <Badge variant={subscriber.isActive ? "default" : "secondary"}>
                  {subscriber.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subscribed</label>
              <p className="text-lg">
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </p>
            </div>
            {subscriber.unsubscribedAt && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">Unsubscribed</label>
                <p className="text-lg">
                  {new Date(subscriber.unsubscribedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
              <p className="text-lg">
                {new Date(subscriber.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Information */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subscriber.ipAddress && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">IP Address</label>
              <p className="font-mono text-sm">{subscriber.ipAddress}</p>
            </div>
          )}
          {subscriber.userAgent && (
            <div>
              <label className="text-sm font-medium text-muted-foreground">User Agent</label>
              <p className="font-mono text-sm text-muted-foreground">
                {subscriber.userAgent}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Book Information (if applicable) */}
      {subscriber.item && subscriber.subscribingTo === "BOOK_PUBLISH" && (
        <Card>
          <CardHeader>
            <CardTitle>Book Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Book Name</label>
              <p className="text-lg">{subscriber.item.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Book ID</label>
              <p className="font-mono text-sm">{subscriber.item.id}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 