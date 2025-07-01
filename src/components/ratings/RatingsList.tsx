
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import { formatDistanceToNow } from "date-fns";

export interface Rating {
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

interface RatingsListProps {
  ratings: Rating[];
  showVerified?: boolean;
}

const RatingsList = ({ ratings, showVerified = true }: RatingsListProps) => {
  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <Card key={rating.id}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Avatar>
                {rating.user.avatar ? (
                  <AvatarImage src={rating.user.avatar} alt={rating.user.name} />
                ) : (
                  <AvatarFallback>
                    {rating.user.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <div>
                    <div className="font-medium">{rating.user.name}</div>
                    <div className="flex items-center gap-2">
                      <StarRating initialRating={rating.rating} readOnly size={16} />
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(rating.date, { addSuffix: true })}
                      </span>
                      {showVerified && rating.verified && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <h4 className="font-medium mb-1">{rating.title}</h4>
                <p className="text-muted-foreground">{rating.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RatingsList;
