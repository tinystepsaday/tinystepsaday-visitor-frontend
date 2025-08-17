export interface OrderItem {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  productType: "physical" | "digital" | "course" | "subscription";
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  isDeliverable: boolean; // Physical products are deliverable, digital products are not
}

export interface OrderAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderStatus {
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
  updatedAt: string;
  updatedBy: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  hasDeliverableItems: boolean; // Whether any items in the order are physical/deliverable
}

// Mock data for orders
export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2025-001",
    customerId: "user-1",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    items: [
      {
        id: "item-1",
        productId: 1,
        productName: "Premium Yoga Mat",
        productImage: "/api/placeholder/60/60",
        productType: "physical",
        quantity: 1,
        unitPrice: 89.99,
        totalPrice: 89.99,
        isDeliverable: true,
      },
      {
        id: "item-2",
        productId: 2,
        productName: "Mindfulness Course",
        productImage: "/api/placeholder/60/60",
        productType: "course",
        quantity: 1,
        unitPrice: 149.99,
        totalPrice: 149.99,
        isDeliverable: false,
      }
    ],
    subtotal: 239.98,
    tax: 19.20,
    shipping: 12.99,
    discount: 25.00,
    total: 247.17,
    currency: "USD",
    status: {
      status: "processing",
      updatedAt: "2025-01-15T10:30:00Z",
      updatedBy: "admin",
      notes: "Order confirmed and being prepared for shipping"
    },
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    shippingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    billingAddress: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    notes: "Customer requested eco-friendly packaging",
    createdAt: "2025-01-15T09:00:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    estimatedDelivery: "2025-01-20",
    trackingNumber: "1Z999AA1234567890",
    hasDeliverableItems: true,
  },
  {
    id: "2",
    orderNumber: "ORD-2025-002",
    customerId: "user-2",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    items: [
      {
        id: "item-3",
        productId: 3,
        productName: "Digital Meditation Guide",
        productImage: "/api/placeholder/60/60",
        productType: "digital",
        quantity: 1,
        unitPrice: 29.99,
        totalPrice: 29.99,
        isDeliverable: false,
      }
    ],
    subtotal: 29.99,
    tax: 2.40,
    shipping: 0,
    discount: 0,
    total: 32.39,
    currency: "USD",
    status: {
      status: "delivered",
      updatedAt: "2025-01-14T16:00:00Z",
      updatedBy: "system",
      notes: "Digital product delivered via email"
    },
    paymentStatus: "paid",
    paymentMethod: "PayPal",
    shippingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+1-555-0456",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    billingAddress: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      phone: "+1-555-0456",
      address: "456 Oak Avenue",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    createdAt: "2025-01-14T14:00:00Z",
    updatedAt: "2025-01-14T16:00:00Z",
    hasDeliverableItems: false,
  },
  {
    id: "3",
    orderNumber: "ORD-2025-003",
    customerId: "user-3",
    customerName: "Mike Johnson",
    customerEmail: "mike.johnson@example.com",
    items: [
      {
        id: "item-4",
        productId: 4,
        productName: "Fitness Tracker",
        productImage: "/api/placeholder/60/60",
        productType: "physical",
        quantity: 2,
        unitPrice: 199.99,
        totalPrice: 399.98,
        isDeliverable: true,
      },
      {
        id: "item-5",
        productId: 5,
        productName: "Nutrition Course",
        productImage: "/api/placeholder/60/60",
        productType: "course",
        quantity: 1,
        unitPrice: 79.99,
        totalPrice: 79.99,
        isDeliverable: false,
      }
    ],
    subtotal: 479.97,
    tax: 38.40,
    shipping: 15.99,
    discount: 50.00,
    total: 484.36,
    currency: "USD",
    status: {
      status: "shipped",
      updatedAt: "2025-01-13T11:15:00Z",
      updatedBy: "admin",
      notes: "Package shipped via FedEx"
    },
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    shippingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      phone: "+1-555-0789",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    billingAddress: {
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@example.com",
      phone: "+1-555-0789",
      address: "789 Pine Street",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    createdAt: "2025-01-13T09:30:00Z",
    updatedAt: "2025-01-13T11:15:00Z",
    estimatedDelivery: "2025-01-18",
    trackingNumber: "1Z999AA1234567891",
    hasDeliverableItems: true,
  },
  {
    id: "4",
    orderNumber: "ORD-2025-004",
    customerId: "user-4",
    customerName: "Sarah Wilson",
    customerEmail: "sarah.wilson@example.com",
    items: [
      {
        id: "item-6",
        productId: 6,
        productName: "Premium Subscription",
        productImage: "/api/placeholder/60/60",
        productType: "subscription",
        quantity: 1,
        unitPrice: 19.99,
        totalPrice: 19.99,
        isDeliverable: false,
      }
    ],
    subtotal: 19.99,
    tax: 1.60,
    shipping: 0,
    discount: 0,
    total: 21.59,
    currency: "USD",
    status: {
      status: "confirmed",
      updatedAt: "2025-01-12T15:45:00Z",
      updatedBy: "admin",
      notes: "Subscription activated"
    },
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    shippingAddress: {
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1-555-0321",
      address: "321 Elm Street",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    billingAddress: {
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.wilson@example.com",
      phone: "+1-555-0321",
      address: "321 Elm Street",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    createdAt: "2025-01-12T14:00:00Z",
    updatedAt: "2025-01-12T15:45:00Z",
    hasDeliverableItems: false,
  },
  {
    id: "5",
    orderNumber: "ORD-2025-005",
    customerId: "user-5",
    customerName: "David Brown",
    customerEmail: "david.brown@example.com",
    items: [
      {
        id: "item-7",
        productId: 7,
        productName: "Resistance Bands Set",
        productImage: "/api/placeholder/60/60",
        productType: "physical",
        quantity: 1,
        unitPrice: 45.99,
        totalPrice: 45.99,
        isDeliverable: true,
      }
    ],
    subtotal: 45.99,
    tax: 3.68,
    shipping: 8.99,
    discount: 0,
    total: 58.66,
    currency: "USD",
    status: {
      status: "pending",
      updatedAt: "2025-01-16T08:00:00Z",
      updatedBy: "system",
      notes: "Order received, awaiting payment confirmation"
    },
    paymentStatus: "pending",
    paymentMethod: "Credit Card",
    shippingAddress: {
      firstName: "David",
      lastName: "Brown",
      email: "david.brown@example.com",
      phone: "+1-555-0654",
      address: "654 Maple Drive",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    billingAddress: {
      firstName: "David",
      lastName: "Brown",
      email: "david.brown@example.com",
      phone: "+1-555-0654",
      address: "654 Maple Drive",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    createdAt: "2025-01-16T08:00:00Z",
    updatedAt: "2025-01-16T08:00:00Z",
    hasDeliverableItems: true,
  },
  {
    id: "6",
    orderNumber: "ORD-2025-006",
    customerId: "user-6",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@example.com",
    items: [
      {
        id: "item-8",
        productId: 8,
        productName: "Yoga Blocks",
        productImage: "/api/placeholder/60/60",
        productType: "physical",
        quantity: 2,
        unitPrice: 24.99,
        totalPrice: 49.98,
        isDeliverable: true,
      },
      {
        id: "item-9",
        productId: 9,
        productName: "Stress Management E-book",
        productImage: "/api/placeholder/60/60",
        productType: "digital",
        quantity: 1,
        unitPrice: 12.99,
        totalPrice: 12.99,
        isDeliverable: false,
      }
    ],
    subtotal: 62.97,
    tax: 5.04,
    shipping: 10.99,
    discount: 10.00,
    total: 69.00,
    currency: "USD",
    status: {
      status: "cancelled",
      updatedAt: "2025-01-11T12:30:00Z",
      updatedBy: "admin",
      notes: "Cancelled by customer request"
    },
    paymentStatus: "refunded",
    paymentMethod: "Credit Card",
    shippingAddress: {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      phone: "+1-555-0987",
      address: "987 Cedar Lane",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA"
    },
    billingAddress: {
      firstName: "Emily",
      lastName: "Davis",
      email: "emily.davis@example.com",
      phone: "+1-555-0987",
      address: "987 Cedar Lane",
      city: "Austin",
      state: "TX",
      zipCode: "73301",
      country: "USA"
    },
    createdAt: "2025-01-11T10:00:00Z",
    updatedAt: "2025-01-11T12:30:00Z",
    hasDeliverableItems: true,
  }
];

// Helper functions
export const getAllOrders = (): Order[] => {
  return mockOrders;
};

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(order => order.id === id);
};

export const getOrdersByStatus = (status: OrderStatus['status']): Order[] => {
  return mockOrders.filter(order => order.status.status === status);
};

export const getOrdersByCustomer = (customerId: string): Order[] => {
  return mockOrders.filter(order => order.customerId === customerId);
};

export const updateOrderStatus = (orderId: string, newStatus: OrderStatus): Order | null => {
  const orderIndex = mockOrders.findIndex(order => order.id === orderId);
  if (orderIndex === -1) return null;
  
  mockOrders[orderIndex].status = newStatus;
  mockOrders[orderIndex].updatedAt = new Date().toISOString();
  
  return mockOrders[orderIndex];
};

export const getOrderStats = () => {
  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = mockOrders.filter(order => order.status.status === 'pending').length;
  const deliveredOrders = mockOrders.filter(order => order.status.status === 'delivered').length;
  
  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    deliveredOrders,
  };
}; 