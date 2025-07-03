"use client";

import { useState } from "react";
import { 
  Users, 
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Event } from "@/data/events";

interface EventBookingCardProps {
  event: Event;
}

export const EventBookingCard = ({ event }: EventBookingCardProps) => {
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [numTickets, setNumTickets] = useState(1);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const simulatePayment = () => {
    setPaymentProcessing(true);
    
    // Simulate payment processing delay
    setTimeout(() => {
      setPaymentProcessing(false);
      setIsBookingComplete(true);
      toast.success("Booking Successful!");
    }, 2000);
  };

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Reserve Your Spot</CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{event.availableSeats} seats available</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold mb-6">${event.price} <span className="text-sm font-normal text-muted-foreground">per person</span></p>
        
        <div className="mb-6">
          <Label htmlFor="numTickets">Number of Tickets</Label>
          <div className="flex items-center mt-2">
            <Button 
              variant="outline" 
              size="icon" 
              disabled={numTickets <= 1}
              onClick={() => setNumTickets(prev => Math.max(1, prev - 1))}
            >
              -
            </Button>
            <Input 
              id="numTickets"
              type="number" 
              min="1" 
              max={event.availableSeats} 
              value={numTickets}
              onChange={(e) => setNumTickets(Math.min(event.availableSeats, Math.max(1, parseInt(e.target.value) || 1)))}
              className="mx-2 text-center"
            />
            <Button 
              variant="outline" 
              size="icon"
              disabled={numTickets >= event.availableSeats}
              onClick={() => setNumTickets(prev => Math.min(event.availableSeats, prev + 1))}
            >
              +
            </Button>
          </div>
        </div>
        
        <div className="flex justify-between text-sm mb-2">
          <span>Price ({numTickets} ticket{numTickets > 1 ? 's' : ''})</span>
          <span>${(event.price * numTickets).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-6">
          <span>Processing Fee</span>
          <span>${(event.price * numTickets * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold mb-6 pt-4 border-t">
          <span>Total</span>
          <span>${(event.price * numTickets * 1.05).toFixed(2)}</span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">Book Now</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Booking</DialogTitle>
              <DialogDescription>
                Complete your booking for {numTickets} ticket{numTickets > 1 ? 's' : ''} to {event.title}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-primary" />
                  <span>{event.date}</span>
                </div>
                <span className="text-muted-foreground">{event.time}</span>
              </div>
              
              <div className="rounded-md bg-muted p-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${(event.price * numTickets).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Processing Fee</span>
                  <span>${(event.price * numTickets * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-2 border-t border-border">
                  <span>Total</span>
                  <span>${(event.price * numTickets * 1.05).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              {isBookingComplete ? (
                <div className="w-full text-center">
                  <div className="text-green-500 font-semibold mb-2">Booking Successful!</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Check your email for booking confirmation and details.
                  </p>
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </div>
              ) : (
                <Button 
                  onClick={simulatePayment} 
                  className="w-full"
                  disabled={paymentProcessing}
                >
                  {paymentProcessing ? "Processing..." : `Pay $${(event.price * numTickets * 1.05).toFixed(2)}`}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          By booking, you agree to our terms and conditions.
        </p>
      </CardContent>
    </Card>
  );
}; 