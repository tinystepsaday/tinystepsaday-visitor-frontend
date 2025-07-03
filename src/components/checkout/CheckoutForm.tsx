"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CreditCard, CheckCircle, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PricingTier } from "@/components/pricing/PricingCard";
import { useCartStore } from "@/store/cartStore";
import { enrollInCourse } from '@/utils/localStorage';
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface CourseInfo {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
}


const getUserSubscriptionDiscount = () => {
  if (typeof window === 'undefined') return 0;
  
  const subscriptionType = localStorage.getItem('subscriptionType') || 'free';
  
  switch(subscriptionType) {
    case 'starter':
      return 0.1;
    case 'transformation':
      return 0.2;
    case 'complete':
      return 0.3;
    default:
      return 0;
  }
};

const getDiscountDescription = () => {
  if (typeof window === 'undefined') return null;
  
  const subscriptionType = localStorage.getItem('subscriptionType') || 'free';
  if (subscriptionType === 'free') return null;
  
  const discountPercent = getUserSubscriptionDiscount() * 100;
  return `${subscriptionType} subscriber discount (${discountPercent}%)`;
};

interface CourseInfo {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  averageRating: number;
  reviewCount: number;
  slug: string;
  lessons: number;
  faqs: string[];
  requirements: string[];
}

interface CheckoutFormProps {
  tierInfo?: {
    tier: PricingTier;
    billingCycle: "monthly" | "yearly" | "threeYear";
  } | null;
  courseInfo?: CourseInfo | null;
}

export default function CheckoutForm({ tierInfo: propTierInfo, courseInfo: propCourseInfo }: CheckoutFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);
  const [courseInfo, setCourseInfo] = useState<CourseInfo | null>(propCourseInfo || null);
  const [tierInfo, setTierInfo] = useState<{
    tier: PricingTier;
    billingCycle: "monthly" | "yearly" | "threeYear";
  } | null>(propTierInfo || null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    paymentMethod: "credit-card"
  });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly" | "threeYear">("monthly");
  
  const { items, totalPrice, totalItems, updateQuantity, removeItem, clearCart } = useCartStore();
  
  const discountRate = getUserSubscriptionDiscount();
  const discount = totalPrice * discountRate;
  const finalPrice = totalPrice - discount;

  useEffect(() => {
    // Handle subscription tier from URL
    const tierName = searchParams.get('tier');
    const billingCycleParam = searchParams.get('cycle') || searchParams.get('billingCycle');
    
    if (tierName && !tierInfo) {
      setBillingCycle(billingCycleParam as "monthly" | "yearly" | "threeYear" || "monthly");
      
      // Fetch pricing tiers data
      import('@/data/pricing').then(({ getTierByName }) => {
        getTierByName(tierName).then((selectedTier) => {
          if (selectedTier) {
            setTierInfo({
              tier: selectedTier,
              billingCycle: billingCycleParam as "monthly" | "yearly" | "threeYear" || "monthly"
            });
          }
        });
      });
    }
    
    // Handle course enrollment from URL
    const courseSlug = searchParams.get('course');
    if (courseSlug && !courseInfo) {
      // Fetch course data from the courses data
      import('@/data/courses').then(({ getCourseBySlug }) => {
        getCourseBySlug(courseSlug).then((course) => {
          if (course) {
            const courseInfo: CourseInfo = {
              id: course.id,
              name: course.title,
              slug: course.slug,
              description: course.description,
              price: course.sale ? course.salePrice! : course.price,
              image: course.image,
              category: course.category,
              averageRating: course.rating,
              reviewCount: course.reviews,
              lessons: course.curriculum.reduce((total, module) => total + module.lessons.length, 0),
              faqs: course.faqs.map((faq) => faq.question),
              requirements: course.requirements,
            };
            setCourseInfo(courseInfo);
          }
        });
      });
    }
  }, [searchParams, courseInfo, tierInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const getBillingPrice = () => {
    if (!tierInfo) return 0;
    
    switch (billingCycle) {
      case "yearly":
        return tierInfo.tier.billingOptions.yearly;
      case "threeYear":
        return tierInfo.tier.billingOptions.threeYear;
      default:
        return tierInfo.tier.billingOptions.monthly;
    }
  };

  const getBillingPeriod = () => {
    switch (billingCycle) {
      case "yearly":
        return "yearly";
      case "threeYear":
        return "3-year";
      default:
        return "monthly";
    }
  };

  const getSavingsText = () => {
    if (!tierInfo) return "";
    
    if (billingCycle === "yearly") {
      const monthly = tierInfo.tier.billingOptions.monthly * 12;
      const yearly = tierInfo.tier.billingOptions.yearly;
      const savings = monthly - yearly;
      return `Save $${savings.toFixed(2)} compared to monthly billing`;
    } else if (billingCycle === "threeYear") {
      const monthly = tierInfo.tier.billingOptions.monthly * 36;
      const threeYear = tierInfo.tier.billingOptions.threeYear;
      const savings = monthly - threeYear;
      return `Save $${savings.toFixed(2)} compared to monthly billing`;
    }
    return "";
  };

  const incrementQuantity = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      updateQuantity(id, item.quantity + 1);
    }
  };

  const decrementQuantity = (id: number) => {
    const item = items.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    } else if (item) {
      removeItem(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        toast.error("Please fill in all payment details");
        return;
      }
    }

    processPayment();
  };

  const processPayment = async () => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (courseInfo) {
        enrollInCourse(courseInfo);
        
        setPaymentStep(2);
        toast.success("Payment successful! You're now enrolled in the course.");
        
        setTimeout(() => {
            router.push(`/courses/${courseInfo.slug}/learning`);
        }, 2000);
      } else {
        if (tierInfo) {
          localStorage.setItem('subscriptionType', tierInfo.tier.name.toLowerCase());
          localStorage.setItem('subscriptionBillingCycle', billingCycle);
          localStorage.setItem('subscriptionStartDate', new Date().toISOString());
          localStorage.setItem('subscriptionPrice', getBillingPrice().toString());
        }
        
        if (items.length > 0) {
          const existingPurchases = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
          const newPurchase = {
            id: Date.now(),
            date: new Date().toISOString(),
            items: items,
            subtotal: totalPrice,
            discount: discount,
            total: finalPrice,
            paymentMethod: formData.paymentMethod
          };
          existingPurchases.push(newPurchase);
          localStorage.setItem('purchaseHistory', JSON.stringify(existingPurchases));
          
          clearCart();
        }
        
        setPaymentStep(2);
        
        toast.success("Payment successful!");
        
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (error: unknown) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  if (paymentStep === 2) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-3">
          {courseInfo ? "Course Enrolled!" : tierInfo ? "Subscription Activated!" : "Order Confirmed!"}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {courseInfo 
            ? `Thank you for enrolling in ${courseInfo.name}.` 
            : tierInfo 
              ? `Thank you for subscribing to our ${tierInfo.tier.name} plan.` 
              : "Thank you for your purchase."} You will be redirected shortly.
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-xs bg-muted h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full animate-pulse" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        {courseInfo && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Course Summary</h2>
            <div className="space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <Image 
                  src={courseInfo.image} 
                  alt={courseInfo.name} 
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-medium text-lg">{courseInfo.name}</h3>
              <p className="text-sm text-muted-foreground">{courseInfo.description}</p>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${courseInfo.price}</span>
              </div>
            </div>
          </Card>
        )}

        {tierInfo && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Subscription Summary</h2>
            <div className="mb-4">
              <div>
                <h3 className="font-medium text-lg">{tierInfo.tier.name} Plan</h3>
                <p className="text-sm text-muted-foreground">{tierInfo.tier.description}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <Tabs 
                value={billingCycle}
                onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly" | "threeYear")}
                className="w-full"
              >
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  <TabsTrigger value="yearly">Yearly</TabsTrigger>
                  <TabsTrigger value="threeYear">3-Year</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {billingCycle !== "monthly" && (
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                  {getSavingsText()}
                </p>
              )}
            </div>
            
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>{getBillingPeriod()} subscription</span>
                <span>${getBillingPrice().toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${getBillingPrice().toFixed(2)}</span>
              </div>
            </div>
          </Card>
        )}

        {items.length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} className="w-full h-full object-cover" width={500} height={500} />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={() => decrementQuantity(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{getDiscountDescription()}</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName"
                    name="fullName" 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com" 
                    required 
                  />
                </div>
              </div>
              
              <RadioGroup 
                defaultValue="credit-card"
                name="paymentMethod"
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                className="mt-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex items-center">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
              
              {formData.paymentMethod === "credit-card" && (
                <div className="border rounded-md p-4 space-y-4 mt-2">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber"
                      name="cardNumber" 
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry">Expiration Date</Label>
                      <Input 
                        id="cardExpiry"
                        name="cardExpiry" 
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input 
                        id="cardCvc"
                        name="cardCvc" 
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button 
              type="submit"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? "Processing..." : "Complete Payment"} {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>By proceeding, you agree to our</p>
          <div className="space-x-2">
            <Link href="/terms" className="hover:underline text-primary">Terms of Service</Link>
            <span>&middot;</span>
            <Link href="/privacy" className="hover:underline text-primary">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
} 