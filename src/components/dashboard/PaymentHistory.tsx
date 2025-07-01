"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Download, CreditCard, Search, Filter } from "lucide-react";

// Mock data
const paymentHistory = [
  {
    id: "INV-2025-0042",
    date: "April 10, 2025",
    amount: 149.00,
    description: "Self-Confidence Builder Course",
    status: "successful",
    paymentMethod: "Visa ending in 4242",
    type: "course"
  },
  {
    id: "INV-2025-0036",
    date: "February 28, 2025",
    amount: 149.00,
    description: "Career Transition Blueprint Course",
    status: "successful",
    paymentMethod: "PayPal",
    type: "course"
  },
  {
    id: "INV-2025-0024",
    date: "January 15, 2025",
    amount: 199.00,
    description: "Emotional Intelligence Mastery Course",
    status: "successful",
    paymentMethod: "Visa ending in 4242",
    type: "course"
  },
  {
    id: "INV-2025-0015",
    date: "December 10, 2024",
    amount: 179.00,
    description: "Relationship Healing & Growth Course",
    status: "successful",
    paymentMethod: "MasterCard ending in 5555",
    type: "course"
  },
  {
    id: "INV-2025-0003",
    date: "March 10, 2025",
    amount: 79.00,
    description: "Mindful Living Essentials Course",
    status: "successful",
    paymentMethod: "PayPal",
    type: "course"
  },
  {
    id: "INV-2025-0039",
    date: "March 22, 2025",
    amount: 150.00,
    description: "Career Guidance Session with Lisa Rodriguez",
    status: "successful",
    paymentMethod: "Visa ending in 4242",
    type: "session"
  },
  {
    id: "INV-2025-0018",
    date: "January 05, 2025",
    amount: 150.00,
    description: "Mindfulness Coaching Session with Dr. Sarah Johnson",
    status: "successful",
    paymentMethod: "PayPal",
    type: "session"
  }
];

// Calculate total spending
const totalSpent = paymentHistory.reduce((total, payment) => total + payment.amount, 0);

const PaymentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [payments, setPayments] = useState(paymentHistory);
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter payments based on search and tab
  const filterPayments = (query: string, tab: string) => {
    let filteredPayments = paymentHistory;
    
    // Apply type filter if not "all"
    if (tab === "courses") {
      filteredPayments = filteredPayments.filter(payment => payment.type === "course");
    } else if (tab === "sessions") {
      filteredPayments = filteredPayments.filter(payment => payment.type === "session");
    }
    
    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredPayments = filteredPayments.filter(payment => 
        payment.description.toLowerCase().includes(lowercaseQuery) ||
        payment.id.toLowerCase().includes(lowercaseQuery) ||
        payment.paymentMethod.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setPayments(filteredPayments);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterPayments(query, activeTab);
  };
  
  // Tab change handler
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    filterPayments(searchQuery, value);
  };
  
  // Download receipt
  const downloadReceipt = (invoiceId: string) => {
    console.log(`Downloading receipt for invoice ${invoiceId}`);
    // In a real application, this would trigger a download of the receipt
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Payment History</h1>
        <p className="text-muted-foreground">
          View and manage your past transactions.
        </p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Total Spent</p>
                <h3 className="text-2xl font-bold">${totalSpent.toFixed(2)}</h3>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Course Purchases</p>
                <h3 className="text-2xl font-bold">
                  {paymentHistory.filter(p => p.type === "course").length}
                </h3>
              </div>
              <div className="bg-blue-50 p-3 rounded-full dark:bg-blue-900/20">
                <BookIcon className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-1">Session Bookings</p>
                <h3 className="text-2xl font-bold">
                  {paymentHistory.filter(p => p.type === "session").length}
                </h3>
              </div>
              <div className="bg-purple-50 p-3 rounded-full dark:bg-purple-900/20">
                <Calendar className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by invoice ID, description, or payment method..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div>
          <Button variant="outline" className="w-full sm:w-auto gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <PaymentTable 
            payments={payments} 
            downloadReceipt={downloadReceipt} 
          />
        </TabsContent>
        
        <TabsContent value="courses" className="mt-0">
          <PaymentTable 
            payments={payments} 
            downloadReceipt={downloadReceipt} 
          />
        </TabsContent>
        
        <TabsContent value="sessions" className="mt-0">
          <PaymentTable 
            payments={payments} 
            downloadReceipt={downloadReceipt} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Book Icon Component
const BookIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
};

// Payment Table Component
const PaymentTable = ({ 
  payments, 
  downloadReceipt 
}: { 
  payments: typeof paymentHistory; 
  downloadReceipt: (invoiceId: string) => void; 
}) => {
  if (payments.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/30 rounded-xl">
        <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or explore our courses to make a purchase.
        </p>
        <Button asChild>
          <a href="/courses">Browse Courses</a>
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="px-6 py-5">
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Invoice ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Payment Method</th>
                <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-muted/40 transition-colors">
                  <td className="px-6 py-4 text-sm">{payment.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      {payment.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{payment.description}</td>
                  <td className="px-6 py-4 text-sm font-medium">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge 
                      variant="outline" 
                      className={payment.status === "successful" 
                        ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800" 
                        : "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                      }
                    >
                      {payment.status === "successful" ? "Successful" : "Pending"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">{payment.paymentMethod}</td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadReceipt(payment.id)}
                      className="gap-1"
                    >
                      <Download className="h-4 w-4" />
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
