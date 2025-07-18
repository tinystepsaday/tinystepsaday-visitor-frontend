"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DetailPageLoader } from "@/components/ui/loaders";
import { MediaSelector } from "@/components/media-selector";
import {
    ArrowLeft,
    Plus,
    X,
    Save,
    Eye,
    ImageIcon
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

interface EventFormData {
    title: string;
    slug: string;
    date: string;
    time: string;
    location: string;
    address: string;
    description: string;
    price: number;
    maxSeats: number;
    facilitator: string;
    facilitatorBio: string;
    agenda: string[];
    category: string;
    status: 'draft' | 'published';
    featured: boolean;
    registrationDeadline: string;
    tags: string[];
    requirements: string[];
    materials: string[];
    image: string;
}

const initialFormData: EventFormData = {
    title: "",
    slug: "",
    date: "",
    time: "",
    location: "",
    address: "",
    description: "",
    price: 0,
    maxSeats: 0,
    facilitator: "",
    facilitatorBio: "",
    agenda: [""],
    category: "",
    status: "draft",
    featured: false,
    registrationDeadline: "",
    tags: [],
    requirements: [""],
    materials: [""],
    image: ""
};

const categories = [
    "mindfulness",
    "meditation",
    "yoga",
    "wellness",
    "retreat",
    "workshop",
    "seminar",
    "training",
    "conference",
    "other"
];

export default function EventFormClient() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<EventFormData>(initialFormData);
    const [newTag, setNewTag] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Generate slug from title
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    // Handle form field changes
    const handleInputChange = (field: keyof EventFormData, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Auto-generate slug when title changes
        if (field === 'title') {
            setFormData(prev => ({
                ...prev,
                slug: generateSlug(value as string)
            }));
        }
    };

    // Handle array field changes
    const handleArrayFieldChange = (field: keyof EventFormData, index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
        }));
    };

    // Add new item to array field
    const addArrayItem = (field: keyof EventFormData) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...(prev[field] as string[]), ""]
        }));
    };

    // Remove item from array field
    const removeArrayItem = (field: keyof EventFormData, index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index)
        }));
    };

    // Add tag
    const addTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag("");
        }
    };

    // Remove tag
    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // Create event mutation
    const createEventMutation = useMutation({
        mutationFn: async (eventData: EventFormData) => {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real app, this would be an API call
            console.log("Creating event:", eventData);

            return {
                id: Date.now().toString(),
                ...eventData,
                availableSeats: eventData.maxSeats,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
            toast.success("Event created successfully!");
            router.push(`/management/events/${data.id}`);
        },
        onError: (error) => {
            toast.error("Failed to create event. Please try again.");
            console.error("Error creating event:", error);
        }
    });

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Basic validation
            if (!formData.title || !formData.date || !formData.facilitator) {
                toast.error("Please fill in all required fields");
                return;
            }

            // Clean up empty array items
            const cleanedData = {
                ...formData,
                agenda: formData.agenda.filter(item => item.trim() !== ""),
                requirements: formData.requirements.filter(item => item.trim() !== ""),
                materials: formData.materials.filter(item => item.trim() !== "")
            };

            await createEventMutation.mutateAsync(cleanedData);
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (createEventMutation.isPending) {
        return <DetailPageLoader title="Creating Event..." subtitle="Please wait while we create your event" />;
    }

    return (
        <div className="space-y-6 w-full">
            {/* Header */}
            <div className="flex items-start justify-between w-full">
                <div className="flex items-start w-full flex-col gap-4">
                    <div className="flex items-center gap-4 w-full justify-between">
                        <Link href="/management/events">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Events
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={() => setFormData(prev => ({ ...prev, status: "draft" }))}>
                                <Save className="mr-2 h-4 w-4" />
                                Save as Draft
                            </Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting}>
                                <Eye className="mr-2 h-4 w-4" />
                                {isSubmitting ? "Creating..." : "Create Event"}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create New Event</h1>
                        <p className="text-muted-foreground">Set up a new event for your platform</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Tabs defaultValue="general" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="general">General Info</TabsTrigger>
                        <TabsTrigger value="details">Event Details</TabsTrigger>
                        <TabsTrigger value="schedule">Schedule & Agenda</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>Essential details about your event</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Event Title *</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                            placeholder="Enter event title"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="slug">URL Slug</Label>
                                        <Input
                                            id="slug"
                                            value={formData.slug}
                                            onChange={(e) => handleInputChange("slug", e.target.value)}
                                            placeholder="event-url-slug"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category *</Label>
                                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category.charAt(0).toUpperCase() + category.slice(1)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={formData.status} onValueChange={(value: 'draft' | 'published') => handleInputChange("status", value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Describe your event..."
                                        rows={4}
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="featured"
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => handleInputChange("featured", checked)}
                                    />
                                    <Label htmlFor="featured">Featured Event</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Tags</CardTitle>
                                <CardDescription>Add relevant tags to help people find your event</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        placeholder="Add a tag..."
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                    />
                                    <Button type="button" onClick={addTag} variant="outline">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                            {tag}
                                            <Button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="details" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Location & Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="location">Location *</Label>
                                        <Input
                                            id="location"
                                            value={formData.location}
                                            onChange={(e) => handleInputChange("location", e.target.value)}
                                            placeholder="e.g., Online, Community Center"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => handleInputChange("address", e.target.value)}
                                            placeholder="Full address or meeting details"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price ($)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maxSeats">Maximum Seats *</Label>
                                        <Input
                                            id="maxSeats"
                                            type="number"
                                            value={formData.maxSeats}
                                            onChange={(e) => handleInputChange("maxSeats", parseInt(e.target.value) || 0)}
                                            placeholder="50"
                                            min="1"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Facilitator Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="facilitator">Facilitator Name *</Label>
                                    <Input
                                        id="facilitator"
                                        value={formData.facilitator}
                                        onChange={(e) => handleInputChange("facilitator", e.target.value)}
                                        placeholder="Enter facilitator name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="facilitatorBio">Facilitator Bio</Label>
                                    <Textarea
                                        id="facilitatorBio"
                                        value={formData.facilitatorBio}
                                        onChange={(e) => handleInputChange("facilitatorBio", e.target.value)}
                                        placeholder="Brief biography of the facilitator..."
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="schedule" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Event Schedule</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="date">Event Date *</Label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => handleInputChange("date", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time">Event Time *</Label>
                                        <Input
                                            id="time"
                                            value={formData.time}
                                            onChange={(e) => handleInputChange("time", e.target.value)}
                                            placeholder="e.g., 2:00 PM - 4:00 PM"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                                    <Input
                                        id="registrationDeadline"
                                        type="date"
                                        value={formData.registrationDeadline}
                                        onChange={(e) => handleInputChange("registrationDeadline", e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Event Agenda</CardTitle>
                                <CardDescription>Outline the schedule and activities</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {formData.agenda.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => handleArrayFieldChange("agenda", index, e.target.value)}
                                            placeholder={`Agenda item ${index + 1}`}
                                        />
                                        {formData.agenda.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeArrayItem("agenda", index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" onClick={() => addArrayItem("agenda")}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Agenda Item
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Requirements & Materials</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-medium">Requirements</h4>
                                    {formData.requirements.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={item}
                                                onChange={(e) => handleArrayFieldChange("requirements", index, e.target.value)}
                                                placeholder={`Requirement ${index + 1}`}
                                            />
                                            {formData.requirements.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeArrayItem("requirements", index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => addArrayItem("requirements")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Requirement
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-medium">Materials</h4>
                                    {formData.materials.map((item, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Input
                                                value={item}
                                                onChange={(e) => handleArrayFieldChange("materials", index, e.target.value)}
                                                placeholder={`Material ${index + 1}`}
                                            />
                                            {formData.materials.length > 1 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => removeArrayItem("materials", index)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                    <Button type="button" variant="outline" onClick={() => addArrayItem("materials")}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Material
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Event Image</CardTitle>
                                <CardDescription>Choose an image for your event from your media library, upload a new one, or add a link</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Event Image</Label>
                                    <MediaSelector
                                        onSelect={(media) => handleInputChange("image", media.url)}
                                        trigger={
                                            <Button variant="outline" className="w-fit">
                                                <ImageIcon className="mr-2 h-4 w-4" />
                                                {formData.image ? "Change Image" : "Select Image"}
                                            </Button>
                                        }
                                    />
                                </div>
                                
                                {formData.image && (
                                    <div className="space-y-2">
                                        <Label>Image Preview</Label>
                                        <div className="relative aspect-video w-full max-w-md rounded-lg overflow-hidden border">
                                            <Image
                                                src={formData.image}
                                                alt="Event image preview"
                                                fill
                                                className="object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "/placeholder.svg";
                                                }}
                                            />
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleInputChange("image", "")}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <X className="mr-2 h-4 w-4" />
                                            Remove Image
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </form>
        </div>
    );
} 