"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";

interface StreakReviewFormProps {
  streakId: string;
  onSubmit: (review: { rating: number; comment: string }) => void;
  onCancel: () => void;
}

export default function StreakReviewForm({ streakId, onSubmit, onCancel }: StreakReviewFormProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _streakId = streakId;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a review comment");
      return;
    }
    
    onSubmit({ rating, comment: comment.trim() });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write a Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Rating</Label>
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                title={`Rate ${star} out of 5`}
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hoveredRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {rating > 0 && `${rating} out of 5`}
            </span>
          </div>
        </div>

        <div>
          <Label htmlFor="review-comment">Your Review</Label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this streak..."
            className="min-h-[100px] mt-2"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={rating === 0 || !comment.trim()}>
            Submit Review
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 