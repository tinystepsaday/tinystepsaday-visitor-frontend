import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";

export default function SessionsNotFound() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Sessions</h2>
      </div>
      
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle>Session Not Found</CardTitle>
          <CardDescription>
            The session you&apos;re looking for doesn&apos;t exist or has been removed.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link href="/management/sessions">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sessions
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 