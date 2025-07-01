"use client"

import { useState } from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  initialRating?: number;
  totalStars?: number;
  onChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: number;
}

const StarRating = ({
  initialRating = 0,
  totalStars = 5,
  onChange,
  readOnly = false,
  size = 20
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (index: number) => {
    if (readOnly) return;
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (readOnly) return;
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    if (readOnly) return;
    setHoverRating(0);
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const filled = (hoverRating || rating) > index;
        
        return (
          <Star
            key={index}
            size={size}
            className={`${
              filled
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            } ${!readOnly && "cursor-pointer transition-colors"}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
