"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { toast } from "sonner";

const formSchema = z.object({
  rating: z.number().min(1, { message: "Please select a rating" }),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface ReviewFormProps {
  productId: number;
  onReviewSubmitted?: () => void;
}

const ReviewForm = ({ productId, onReviewSubmitted }: ReviewFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Review data:", { productId, ...data });
    
    toast("Review Submitted");
    
    form.reset();
    setIsSubmitting(false);
    
    if (onReviewSubmitted) {
      onReviewSubmitted();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <StarRating
                  initialRating={field.value}
                  onChange={field.onChange}
                  size={24}
                />
              </FormControl>
              <FormDescription>
                Click on a star to rate this product
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input placeholder="Summarize your experience" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Share your experience with this product"
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </Form>
  );
};

export default ReviewForm;
