"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import QuizResultDetails from "@/components/dashboard/QuizResultDetails";
import { DetailPageLoader } from '@/components/ui/loaders';

export default function QuizResultPage() {
  const params = useParams();
  const resultId = params.resultId as string;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (resultId) {
      setIsLoading(false);
    }
  }, [resultId]);

  if (isLoading) {
    return <DetailPageLoader />;
  }

  if (!resultId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Invalid Result ID</h1>
          <p className="text-muted-foreground">No result ID provided.</p>
        </div>
      </div>
    );
  }

  return <QuizResultDetails resultId={resultId} />;
}
