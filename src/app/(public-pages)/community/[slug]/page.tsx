import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Community",
  description: "A community dedicated to mindfulness and meditation practice",
};

const CommunityDetails = () => {

  const community = {
    id: "meditation",
    name: "Meditation Masters",
    description: "A community dedicated to mindfulness and meditation practice",
    image: "/placeholder.svg",
    totem: "🧘",
    memberCount: 1250,
    leader: {
      name: "Sarah Johnson",
      role: "Community Leader",
      avatar: "/placeholder.svg"
    },
    location: {
      discord: "discord.gg/meditation-masters",
      instagram: "@meditationmasters",
      facebook: "fb.com/meditationmasters"
    },
    guidelines: [
      "Regular participation in community events",
      "Share your meditation experiences",
      "Support fellow meditators",
      "Follow mindfulness principles"
    ]
  };

  return (
    <>
      <div className="container py-8 px-4">
        <div className="max-w-4xl mx-auto mt-16 md:mt-24">
          <div className="flex items-center gap-6 mb-8">
            <Image
              src={community.image}
              alt={community.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <span className="text-4xl">{community.totem}</span>
                {community.name}
              </h1>
              <p className="text-muted-foreground mt-2">{community.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">{community.memberCount} members</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Community Leader</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Image
                    src={community.leader.avatar}
                    alt={community.leader.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{community.leader.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {community.leader.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Find Us On</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Discord</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${community.location.discord}`} target="_blank" rel="noopener noreferrer">
                      Join Server
                    </a>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Instagram</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://instagram.com/${community.location.instagram}`} target="_blank" rel="noopener noreferrer">
                      Follow
                    </a>
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Facebook</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${community.location.facebook}`} target="_blank" rel="noopener noreferrer">
                      Join Group
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Enrollment Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {community.guidelines.map((guideline, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{guideline}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CommunityDetails;
