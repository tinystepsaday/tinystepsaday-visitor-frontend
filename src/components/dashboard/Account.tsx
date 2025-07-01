"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User, Lock, Shield, Bell, CreditCard } from "lucide-react";
import { toast } from "sonner";

// Form validation schemas
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  bio: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  phone: z.string().optional()
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  newPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." }),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const Account = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Profile form setup
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      bio: "Mindfulness practitioner and personal growth enthusiast. I'm on a journey to discover my authentic self and help others do the same.",
      location: "San Francisco, CA",
      website: "https://sarahjohnson.com",
      phone: "+1 (555) 123-4567"
    }
  });
  
  // Password form setup
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });
  
  // Handle profile form submission
  const onProfileSubmit = (data: ProfileFormValues) => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Profile updated:", data);
      toast("Profile updated!");
      setIsUpdating(false);
    }, 1500);
  };
  
  // Handle password form submission
  const onPasswordSubmit = () => {
    setIsUpdating(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Password updated");
      toast("Password updated!");
      passwordForm.reset();
      setIsUpdating(false);
    }, 1500);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account details and preferences.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-8">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and public profile.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isUpdating} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} disabled={isUpdating} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Tell us about yourself"
                                {...field}
                                disabled={isUpdating}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="City, Country" {...field} disabled={isUpdating} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1 (555) 123-4567" {...field} disabled={isUpdating} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="website"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl>
                              <Input placeholder="https://example.com" {...field} disabled={isUpdating} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" disabled={isUpdating}>
                        {isUpdating ? "Saving Changes..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Update your profile photo.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-6">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Johnson" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                
                <div className="space-y-2 w-full">
                  <Button variant="outline" className="w-full">
                    Upload New Photo
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    Remove Photo
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Recommended: Square JPG, PNG, or GIF, at least 400x400 pixels.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Password Tab */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6 max-w-lg">
                  <div className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isUpdating} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isUpdating} />
                          </FormControl>
                          <div className="text-xs text-muted-foreground mt-1">
                            Must contain at least 8 characters, including uppercase, lowercase, and numbers.
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} disabled={isUpdating} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Updating Password..." : "Update Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-muted p-2 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by requiring both a password and authentication code.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Set Up Two-Factor Authentication</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Course Updates</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about new content in your enrolled courses.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Mentor Sessions</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive reminders about upcoming mentorship sessions.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Newsletter</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive our weekly newsletter with articles and updates.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Promotions and Offers</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive information about special offers and discounts.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Website Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Course Completion</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when you complete a course or module.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">New Comments</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when someone replies to your comments.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Billing Tab */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment methods and billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Saved Payment Methods</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="bg-muted p-2 rounded-full">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-5 w-5 text-blue-600"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Visa ending in 4242</h4>
                      <p className="text-sm text-muted-foreground">
                        Expires 04/2027
                      </p>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Default payment method</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Remove</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="bg-muted p-2 rounded-full">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="h-5 w-5 text-blue-400"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">PayPal</h4>
                      <p className="text-sm text-muted-foreground">
                        sarah@example.com
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Remove</Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Billing Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Billing Name</h4>
                      <p className="text-sm text-muted-foreground">Sarah Johnson</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Billing Address</h4>
                      <p className="text-sm text-muted-foreground">
                        123 Main Street<br />
                        San Francisco, CA 94103<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button variant="outline" className="mt-4">
                  Update Billing Information
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
