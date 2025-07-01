"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";

export interface ReviewType {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  date: Date;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
}

interface ProductReviewProps {
  review: ReviewType;
}

const ProductReview = ({ review }: ProductReviewProps) => {
  const initials = review.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="py-4 border-b">
      <div className="flex items-start gap-4">
        <Avatar>
          {review.user.avatar ? (
            <AvatarImage src={review.user.avatar} alt={review.user.name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <div>
              <div className="font-medium">{review.user.name}</div>
              <div className="flex items-center gap-2">
                <StarRating initialRating={review.rating} readOnly size={16} />
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(review.date, { addSuffix: true })}
                </span>
                {review.verified && (
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                    Verified Purchase
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <h4 className="font-medium mb-1">{review.title}</h4>
          <p className="text-muted-foreground">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
