import { DetailPageLoader } from "@/components/ui/loaders";

export default function MessageLoading() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <DetailPageLoader title="Loading Message..." subtitle="Please wait while we fetch the message details" />
    </div>
  );
} 