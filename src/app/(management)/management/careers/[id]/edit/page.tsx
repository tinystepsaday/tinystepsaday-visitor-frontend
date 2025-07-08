"use client";

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { getCareerById } from '@/data/careers';

interface CareerFormData {
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  summary: string;
  content: string;
  status: 'draft' | 'active' | 'closed' | 'archived';
  isPublic: boolean;
  allowApplications: boolean;
  applicationDeadline?: string;
  maxApplications?: number;
  requirements: string[];
  benefits: string[];
  tags: string[];
}

const departments = [
  'Coaching',
  'Content',
  'Product',
  'Engineering',
  'Community',
  'Marketing',
  'Sales',
  'Operations',
  'Finance',
  'HR'
];

const jobTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Freelance'
];

const locations = [
  'Remote',
  'San Francisco, CA',
  'New York, NY',
  'Los Angeles, CA',
  'Austin, TX',
  'Seattle, WA',
  'Boston, MA',
  'Chicago, IL',
  'Denver, CO',
  'Miami, FL'
];

interface EditCareerPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCareerPage({ params }: EditCareerPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<CareerFormData>({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    summary: '',
    content: '',
    status: 'draft',
    isPublic: false,
    allowApplications: true,
    requirements: [],
    benefits: [],
    tags: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCareer = async () => {
      try {
        const { id } = await params;

        const career = getCareerById(id);
        if (career) {
          setFormData({
            title: career.title,
            department: career.department,
            location: career.location,
            type: career.type,
            salary: career.salary,
            summary: career.summary,
            content: career.content,
            status: 'active', // Default status for existing careers
            isPublic: true, // Default to public for existing careers
            allowApplications: true,
            requirements: [],
            benefits: [],
            tags: []
          });
        }
      } catch {
        toast.error('Failed to load career position');
      } finally {
        setIsLoading(false);
      }
    };

    loadCareer();
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleArrayInput = (name: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [name]: items }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Career position updated successfully!');
      router.push('/management/careers');
    } catch {
      toast.error('Failed to update career position. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success('Career position deleted successfully!');
      router.push('/management/careers');
    } catch {
      toast.error('Failed to delete career position. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center flex-col justify-between">
        <div className="flex items-center gap-4 w-full justify-between">
          <Link href="/management/careers">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Careers
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showPreview ? 'Hide Preview' : 'Show Preview'}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Position</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this position? This action cannot be undone and will remove all associated applications.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Edit Position</h1>
          <p className="text-muted-foreground">
            Update job position details and settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Essential details about the position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior Frontend Developer"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => handleSelectChange('department', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleSelectChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Employment Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => handleSelectChange('type', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range *</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g., $80,000 - $120,000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Job Summary *</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    placeholder="Brief description of the position"
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Detailed information about the role, responsibilities, and requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Full Job Description *</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Enter the full job description with sections for responsibilities, requirements, etc."
                    rows={12}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    You can use HTML tags for formatting. Common sections: Position Overview, Responsibilities, Requirements, Nice to Have
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                  <Input
                    id="requirements"
                    name="requirements"
                    value={formData.requirements.join(', ')}
                    onChange={(e) => handleArrayInput('requirements', e.target.value)}
                    placeholder="e.g., 3+ years experience, React knowledge, Team collaboration"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                  <Input
                    id="benefits"
                    name="benefits"
                    value={formData.benefits.join(', ')}
                    onChange={(e) => handleArrayInput('benefits', e.target.value)}
                    placeholder="e.g., Health insurance, Remote work, Professional development"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleArrayInput('tags', e.target.value)}
                    placeholder="e.g., React, TypeScript, Remote, Senior"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Control the visibility and behavior of this position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Current status of the position
                    </p>
                  </div>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Visibility</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this position on the public careers page
                    </p>
                  </div>
                  <Switch
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleSwitchChange('isPublic', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Accept Applications</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow candidates to submit applications
                    </p>
                  </div>
                  <Switch
                    checked={formData.allowApplications}
                    onCheckedChange={(checked) => handleSwitchChange('allowApplications', checked)}
                  />
                </div>

                {formData.allowApplications && (
                  <>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="applicationDeadline">Application Deadline</Label>
                        <Input
                          id="applicationDeadline"
                          name="applicationDeadline"
                          type="date"
                          value={formData.applicationDeadline}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxApplications">Max Applications</Label>
                        <Input
                          id="maxApplications"
                          name="maxApplications"
                          type="number"
                          value={formData.maxApplications}
                          onChange={handleInputChange}
                          placeholder="Leave empty for unlimited"
                        />
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex items-center justify-end gap-4">
              <Link href="/management/careers">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Update Position
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How this position will appear to candidates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{formData.title || 'Job Title'}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{formData.location || 'Location'}</span>
                    <span>{formData.type || 'Type'}</span>
                    <span>{formData.department || 'Department'}</span>
                  </div>
                  <div className="text-sm font-medium">{formData.salary || 'Salary'}</div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-medium">Summary</h4>
                  <p className="text-sm text-muted-foreground">
                    {formData.summary || 'Job summary will appear here...'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Status</h4>
                  <Badge variant={formData.status === 'active' ? 'default' : 'secondary'}>
                    {formData.status || 'draft'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Settings</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <span>Public:</span>
                      <Badge variant={formData.isPublic ? 'default' : 'secondary'}>
                        {formData.isPublic ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Applications:</span>
                      <Badge variant={formData.allowApplications ? 'default' : 'secondary'}>
                        {formData.allowApplications ? 'Open' : 'Closed'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">URL Slug</h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    /careers/{generateSlug(formData.title)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
} 