"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Download, 
  Share2, 
  Star
} from "lucide-react";
import { Course } from "@/data/courses";
import { toast } from "sonner";
import Image from "next/image";

interface CourseCertificateProps {
  course: Course;
  completedDate: string;
}

const CourseCertificate = ({ course, completedDate }: CourseCertificateProps) => {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF certificate
    toast.success("Certificate downloaded successfully!");
  };

  const handleShare = () => {
    // In a real app, this would share the certificate
    if (navigator.share) {
      navigator.share({
        title: `Certificate: ${course.title}`,
        text: `I just completed ${course.title} on Tiny Steps A Day!`,
        url: typeof window !== 'undefined' ? window.location.href : '',
      });
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(
        `I just completed ${course.title} on Tiny Steps A Day!`
      );
      toast.success("Certificate link copied to clipboard!");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Certificate of Completion</CardTitle>
        <p className="text-muted-foreground">
          This is to certify that you have successfully completed
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Course Details */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-primary">{course.title}</h3>
          <p className="text-muted-foreground">{course.description}</p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.modules}</div>
            <div className="text-sm text-muted-foreground">Modules</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.lessons}</div>
            <div className="text-sm text-muted-foreground">Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.duration}</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
        </div>

        {/* Completion Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Completed on:</span>
            <span className="text-sm font-medium">{completedDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Instructor:</span>
            <span className="text-sm font-medium">{course.instructor.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Course Level:</span>
            <Badge variant="outline">{course.level}</Badge>
          </div>
        </div>

        {/* Instructor Info */}
        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
          <Image 
            src={course.instructor.avatar} 
            alt={course.instructor.name}  
            className="w-12 h-12 rounded-full object-cover"
            width={48}
            height={48}
          />
          <div>
            <h4 className="font-medium">{course.instructor.name}</h4>
            <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star className="h-3 w-3 text-yellow-500 fill-current" />
              <span className="text-xs text-muted-foreground">
                {course.instructor.rating} rating
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            Download Certificate
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Verification */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Certificate ID: {course.id}-{Date.now()}</p>
          <p>This certificate can be verified at tiny stepsaday.com/verify</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCertificate; 