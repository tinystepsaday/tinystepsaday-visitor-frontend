"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM", 
  "10:00 AM", 
  "11:00 AM", 
  "1:00 PM", 
  "2:00 PM", 
  "3:00 PM", 
  "4:00 PM"
];

// Array of unavailable dates (for demonstration)
const unavailableDates = [
  new Date(2025, 3, 22), // April 22, 2025
  new Date(2025, 3, 23), // April 23, 2025
  new Date(2025, 3, 28), // April 28, 2025
];

// Consultation types
const consultationTypes = [
  { value: "individual", label: "Individual Session (60 min)", price: 99 },
  { value: "couple", label: "Couple's Session (90 min)", price: 149 },
  { value: "group", label: "Group Session (120 min)", price: 199 },
  { value: "initial", label: "Initial Assessment (45 min)", price: 75 },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string({ required_error: "Please select a time slot" }),
  type: z.string({ required_error: "Please select a consultation type" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ScheduleForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Booking data:", data);
    toast.success("Consultation Booked");
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Book Your Session</CardTitle>
            <CardDescription>
              Select your preferred date, time, and consultation type.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Type</FormLabel>
                      <Select 
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a consultation type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {consultationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label} - ${type.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={`w-full pl-3 text-left font-normal ${
                                  !field.value && "text-muted-foreground"
                                }`}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => 
                                date < new Date() || 
                                date.getDay() === 0 || 
                                date.getDay() === 6 ||
                                unavailableDates.some(
                                  unavailableDate => 
                                    unavailableDate.toDateString() === date.toDateString()
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Select a weekday. Unavailable dates are disabled.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {time}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your concerns or specific topics you'd like to discuss"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Booking..." : "Book Consultation"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Consultation Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Available Consultation Types</h3>
              <ul className="space-y-2">
                {consultationTypes.map((type) => (
                  <li key={type.value} className="flex justify-between">
                    <span>{type.label}</span>
                    <span className="font-medium">${type.price}</span>
                  </li>   
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">What to Expect</h3>
              <p className="text-sm text-muted-foreground">
                Our consultations take place through secure video conferencing. You&apos;ll receive a confirmation email with a link to join the session.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Cancellation Policy</h3>
              <p className="text-sm text-muted-foreground">
                Cancellations with at least 24 hours notice will receive a full refund. Late cancellations may be subject to a fee.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 