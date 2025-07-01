import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  totem: string;
  memberCount: number;
}

const CommunityCard = ({
  id,
  name,
  description,
  image,
  totem,
  memberCount,
}: CommunityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={name}
            width={400}
            height={250}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div>
            <CardTitle className="flex items-center gap-2">
              <span>{totem}</span>
              {name}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Users className="h-4 w-4" />
              <span>{memberCount} members</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button asChild className="w-full">
          <Link href={`/community/${id}`}>View Community</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CommunityCard;
