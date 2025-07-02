"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Career } from "@/data/careers";

interface CareerApplicationClientProps {
  career: Career;
  careerId: string;
}

export default function CareerApplicationClient({ career, careerId }: CareerApplicationClientProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    heardFrom: "",
    resumeUploaded: false,
    coverLetterUploaded: false,
    education: "",
    experience: "",
    whyInterested: "",
    startDate: "",
    salary: "",
    workAuth: false,
    sponsorship: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (name: string) => {
    // In a real application, we'd handle file upload here
    setFormData(prev => ({ ...prev, [name]: true }));
    toast("File uploaded successfully");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast("Application submitted successfully");
      router.push("/careers");
    }, 1500);
  };

  return (
    <div className="py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href={`/careers/${careerId}`} className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to job details
        </Link>

        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Apply for {career.title}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Please fill out the application form below. We&apos;ll review your information and get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Current Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heardFrom">How did you hear about us?</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("heardFrom", value)}
                  value={formData.heardFrom}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedIn">LinkedIn</SelectItem>
                    <SelectItem value="jobBoard">Job Board</SelectItem>
                    <SelectItem value="companyWebsite">Company Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourname"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Personal Website/Portfolio</Label>
                <Input
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Resume & Cover Letter</h2>
            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Resume *</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-24 flex flex-col items-center justify-center"
                  onClick={() => handleFileUpload("resumeUploaded")}
                >
                  {formData.resumeUploaded ? (
                    <>
                      <div className="text-green-500 mb-1">✓ Uploaded</div>
                      <span className="text-sm text-muted-foreground">Click to upload a different file</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 mb-2" />
                      <span>Upload Resume (PDF, DOCX)</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Cover Letter</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-24 flex flex-col items-center justify-center"
                  onClick={() => handleFileUpload("coverLetterUploaded")}
                >
                  {formData.coverLetterUploaded ? (
                    <>
                      <div className="text-green-500 mb-1">✓ Uploaded</div>
                      <span className="text-sm text-muted-foreground">Click to upload a different file</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-6 w-6 mb-2" />
                      <span>Upload Cover Letter (PDF, DOCX)</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Additional Information</h2>
            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education Background</Label>
                <Textarea
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Please share your relevant education details"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Relevant Experience *</Label>
                <Textarea
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Please summarize your relevant work experience"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whyInterested">Why are you interested in this role? *</Label>
                <Textarea
                  id="whyInterested"
                  name="whyInterested"
                  value={formData.whyInterested}
                  onChange={handleInputChange}
                  placeholder="Tell us why you&apos;re interested in this position and what you would bring to our team"
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Earliest Start Date *</Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("startDate", value)}
                    value={formData.startDate}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="twoWeeks">2 weeks</SelectItem>
                      <SelectItem value="oneMonth">1 month</SelectItem>
                      <SelectItem value="twoMonths">2 months</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Expectations</Label>
                  <Input
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    placeholder="What are your salary expectations?"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="workAuth"
                  checked={formData.workAuth}
                  onCheckedChange={(checked) => handleCheckboxChange("workAuth", checked as boolean)}
                />
                <Label htmlFor="workAuth" className="text-sm">
                  I am legally authorized to work in the United States *
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sponsorship"
                  checked={formData.sponsorship}
                  onCheckedChange={(checked) => handleCheckboxChange("sponsorship", checked as boolean)}
                />
                <Label htmlFor="sponsorship" className="text-sm">
                  I will require sponsorship now or in the future
                </Label>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <Separator />
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" asChild>
                <Link href={`/careers/${careerId}`}>
                  Cancel
                </Link>
              </Button>
              <Button type="submit" disabled={isSubmitting || !formData.resumeUploaded}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground text-center pt-2">
              By submitting this application, you consent to our processing of your personal data as described in our Privacy Policy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
} 