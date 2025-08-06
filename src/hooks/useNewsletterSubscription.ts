import { useState } from "react";
import { subscribeToNewsletter } from "@/lib/api/subscribers";
import { toast } from "sonner";

export function useNewsletterSubscription() {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = async (email: string, subscribingTo: "FOOTER" | "MODAL" | "BOOK_PUBLISH" = "FOOTER", item?: { name: string; id: string }) => {
    setIsLoading(true);
    try {
      const response = await subscribeToNewsletter({ email, subscribingTo, item });
      
      if (response.success) {
        toast.success("Successfully subscribed to newsletter!");
        return true;
      } else {
        toast.error(response.message || "Failed to subscribe to newsletter");
        return false;
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Failed to subscribe to newsletter. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    subscribe,
    isLoading,
  };
} 
 