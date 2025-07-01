"use client"

import { Progress } from "@/components/ui/progress";
import StarRating from "./StarRating";

interface RatingStatsProps {
  averageRating: number;
  totalRatings: number;
  ratingBreakdown: {
    rating: number;
    count: number;
  }[];
}

const RatingStats = ({ averageRating, totalRatings, ratingBreakdown }: RatingStatsProps) => {
  const maxCount = Math.max(...ratingBreakdown.map(b => b.count));
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="text-center md:text-left">
        <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
        <StarRating initialRating={averageRating} readOnly size={24} />
        <div className="text-sm text-muted-foreground mt-2">
          Based on {totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'}
        </div>
      </div>
      
      <div className="space-y-3">
        {ratingBreakdown.map(({ rating, count }) => (
          <div key={rating} className="flex items-center gap-4">
            <div className="w-12 text-sm text-muted-foreground">
              {rating} stars
            </div>
            <Progress value={(count / maxCount) * 100} className="h-2" />
            <div className="w-12 text-sm text-right text-muted-foreground">
              {count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingStats;
