"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Download, Save, Copy } from "lucide-react";
import { toast } from "sonner";

interface CourseNotesProps {
  lessonId: string;
  moduleTitle: string;
  lessonTitle: string;
}

const CourseNotes = ({ lessonId, moduleTitle, lessonTitle }: CourseNotesProps) => {
  // In a real app, these notes would be loaded from a database
  const defaultNotes = `# ${moduleTitle}: ${lessonTitle}\n\n## Key Concepts\n\n- Mindfulness involves paying attention to the present moment\n- Regular practice helps reduce stress and anxiety\n- Even brief sessions can improve focus and well-being\n\n## Practice Techniques\n\n1. Start with short 5-minute sessions\n2. Focus on your breath as an anchor\n3. Notice when your mind wanders, then gently return focus\n4. Be kind to yourself when distractions occur\n\n## Resources\n\n- Recommended reading: "Wherever You Go, There You Are" by Jon Kabat-Zinn\n- Daily practice app: Calm or Headspace\n- Local meditation groups in your area`;
  
  const [notes, setNotes] = useState(defaultNotes);
  const [personalNotes, setPersonalNotes] = useState("");
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPersonalNotes(localStorage.getItem(`personal-notes-${lessonId}`) || "");
    }
  }, [lessonId]);
  
  const handleSaveNotes = () => {
    setSaving(true);
    
    // Simulate API call to save notes
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(`personal-notes-${lessonId}`, personalNotes);
      }
      setSaving(false);
      toast.success("Notes saved successfully!");
    }, 1000);
  };
  
  const handleCopyNotes = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(notes);
      toast.success("Notes copied to clipboard!");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Lesson Notes</CardTitle>
          <CardDescription>
            Key concepts and resources from this lesson
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans p-4 bg-muted/30 rounded-md text-sm">
              {notes}
            </pre>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={handleCopyNotes}>
                <Copy className="mr-2 h-4 w-4" /> Copy
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Notes</CardTitle>
          <CardDescription>
            Add your personal notes for this lesson
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[300px] font-mono text-sm"
            placeholder="Take your notes here..."
            value={personalNotes}
            onChange={(e) => setPersonalNotes(e.target.value)}
          />
          
          <Button 
            onClick={handleSaveNotes} 
            className="mt-4"
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? "Saving..." : "Save Notes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseNotes;
