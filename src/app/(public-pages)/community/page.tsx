import { SectionHeader } from "@/components/ui/section-header";
import CommunityCard from "@/components/community/CommunityCard";

const Community = () => {
  const communities = [
    {
      id: "meditation",
      name: "Meditation Masters",
      description: "A community dedicated to mindfulness and meditation practice",
      image: "/placeholder.svg",
      totem: "🧘",
      memberCount: 1250,
    },
    {
      id: "reading",
      name: "Book Enthusiasts",
      description: "Share your reading journey and discover new books",
      image: "/placeholder.svg",
      totem: "📚",
      memberCount: 890,
    },
    {
      id: "wellness",
      name: "Wellness Warriors",
      description: "Supporting each other in health and wellness goals",
      image: "/placeholder.svg",
      totem: "🌱",
      memberCount: 750,
    },
  ];

  return (
    <>
      <div className="container py-8 w-full flex flex-col gap-4 items-center mt-10">
        <SectionHeader
          title="Our Communities"
          subtitle="Join like-minded individuals on your journey of personal growth and transformation"
          isPageHeader={true}
          centered={true}
        />

        <div className="max-w-4xl mx-auto mb-12 w-full flex flex-col gap-4 items-center px-4">
          <div className="prose prose-gray dark:prose-invert max-w-none mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl text-slate-800 dark:text-slate-200 font-bold mb-4">Our Values</h3>
              <ul className="list-disc list-inside">
                <li>Respect and support for all members</li>
                <li>Open and honest communication</li>
                <li>Commitment to personal growth</li>
                <li>Sharing knowledge and experiences</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl text-slate-800 dark:text-slate-200 dark:prose-invert font-bold mb-4">Engagement Policies</h3>
              <ul className="list-disc list-inside">
                <li>Be kind and courteous to other members</li>
                <li>No hate speech or bullying</li>
                <li>Respect privacy and confidentiality</li>
                <li>Stay on topic and contribute meaningfully</li>
              </ul>
            </div>
          </div>
        </div>

        <SectionHeader
          title="Join a Community"
          subtitle="Find your tribe and grow together"
          isPageHeader={false}
          centered={false}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
          {communities.map((community) => (
            <CommunityCard key={community.id} {...community} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
