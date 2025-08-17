export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'support' | 'mentorship' | 'billing' | 'technical' | 'feedback';
  createdAt: string;
  updatedAt: string;
  readAt?: string;
  repliedAt?: string;
  assignedTo?: string;
  tags: string[];
  source: 'contact-form' | 'email' | 'phone' | 'chat';
  ipAddress?: string;
  userAgent?: string;
}

export interface MessageReply {
  id: string;
  messageId: string;
  content: string;
  sentBy: 'admin' | 'user';
  sentAt: string;
  attachments?: string[];
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// Sample contact messages
export const sampleMessages: ContactMessage[] = [
  {
    id: "msg_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    subject: "Mentorship Program Inquiry",
    message: "Hi, I'm interested in your mentorship programs. I'm a software developer looking to transition into product management. Could you tell me more about your career guidance services and pricing?",
    status: "unread",
    priority: "medium",
    category: "mentorship",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    tags: ["career-change", "product-management"],
    source: "contact-form",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "msg_002",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    subject: "Technical Support - Course Access Issue",
    message: "I'm having trouble accessing the mindfulness course I purchased last week. When I try to log in, I get an error message saying 'Access Denied'. I've tried clearing my browser cache but it didn't help. Can you please help me resolve this?",
    status: "read",
    priority: "high",
    category: "technical",
    createdAt: "2025-01-14T15:45:00Z",
    updatedAt: "2025-01-14T16:20:00Z",
    readAt: "2025-01-14T16:20:00Z",
    assignedTo: "tech-support",
    tags: ["course-access", "login-issue"],
    source: "contact-form",
    ipAddress: "203.45.67.89",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
  {
    id: "msg_003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@gmail.com",
    subject: "Billing Question - Refund Request",
    message: "I recently purchased the 6-month mentorship program but had to cancel due to personal circumstances. I was wondering if I could get a partial refund for the remaining sessions. I've only attended 2 out of the 24 scheduled sessions.",
    status: "replied",
    priority: "medium",
    category: "billing",
    createdAt: "2025-01-13T09:15:00Z",
    updatedAt: "2025-01-13T14:30:00Z",
    readAt: "2025-01-13T10:00:00Z",
    repliedAt: "2025-01-13T14:30:00Z",
    assignedTo: "billing-team",
    tags: ["refund", "cancellation"],
    source: "email",
    ipAddress: "98.76.54.32",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15"
  },
  {
    id: "msg_004",
    name: "David Thompson",
    email: "david.thompson@startup.io",
    subject: "Partnership Opportunity",
    message: "Hello! I'm the founder of a wellness startup and I'd love to explore potential partnership opportunities with Tiny Steps A Day. We have a complementary service offering and I believe we could create great value together. Would you be interested in a call to discuss this further?",
    status: "unread",
    priority: "high",
    category: "general",
    createdAt: "2025-01-12T11:20:00Z",
    updatedAt: "2025-01-12T11:20:00Z",
    tags: ["partnership", "business-development"],
    source: "contact-form",
    ipAddress: "45.67.89.123",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "msg_005",
    name: "Lisa Wang",
    email: "lisa.wang@consulting.com",
    subject: "Feedback on Meditation Course",
    message: "I just completed the 30-day meditation challenge and wanted to share my feedback. The course was absolutely transformative! The guided sessions were perfect for beginners like me, and I loved the daily check-ins. I've already recommended it to several friends. Thank you for creating such valuable content!",
    status: "read",
    priority: "low",
    category: "feedback",
    createdAt: "2025-01-11T16:45:00Z",
    updatedAt: "2025-01-11T17:10:00Z",
    readAt: "2025-01-11T17:10:00Z",
    tags: ["positive-feedback", "meditation-course"],
    source: "contact-form",
    ipAddress: "67.89.123.45",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
  },
  {
    id: "msg_006",
    name: "Robert Kim",
    email: "robert.kim@techcorp.com",
    subject: "Urgent: Account Security Concern",
    message: "I received an email notification about a login from an unknown device. I'm concerned about the security of my account. I haven't logged in from any new devices recently. Can you please investigate this and let me know if there's been any suspicious activity?",
    status: "unread",
    priority: "urgent",
    category: "support",
    createdAt: "2025-01-10T08:30:00Z",
    updatedAt: "2025-01-10T08:30:00Z",
    tags: ["security", "account-access"],
    source: "email",
    ipAddress: "123.45.67.89",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  },
  {
    id: "msg_007",
    name: "Amanda Foster",
    email: "amanda.foster@freelancer.com",
    subject: "Workshop Registration Issue",
    message: "I tried to register for the upcoming mindfulness workshop but the registration form keeps giving me an error. It says 'Payment processing failed' even though my card details are correct. I've tried multiple times with different browsers. Can you help me complete the registration?",
    status: "read",
    priority: "high",
    category: "support",
    createdAt: "2025-01-09T13:20:00Z",
    updatedAt: "2025-01-09T14:05:00Z",
    readAt: "2025-01-09T14:05:00Z",
    assignedTo: "support-team",
    tags: ["payment-issue", "workshop-registration"],
    source: "contact-form",
    ipAddress: "89.123.45.67",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"
  },
  {
    id: "msg_008",
    name: "James Wilson",
    email: "james.wilson@student.edu",
    subject: "Student Discount Inquiry",
    message: "I'm a university student and I'm interested in your mentorship programs. Do you offer any student discounts or special pricing for students? I'm particularly interested in the career guidance sessions but my budget is limited as a student.",
    status: "replied",
    priority: "medium",
    category: "general",
    createdAt: "2025-01-08T10:15:00Z",
    updatedAt: "2025-01-08T11:45:00Z",
    readAt: "2025-01-08T10:30:00Z",
    repliedAt: "2025-01-08T11:45:00Z",
    tags: ["student-discount", "pricing"],
    source: "contact-form",
    ipAddress: "234.56.78.90",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
  }
];

// Sample message replies
export const sampleReplies: MessageReply[] = [
  {
    id: "reply_001",
    messageId: "msg_003",
    content: "Hi Emily, thank you for reaching out about your refund request. I understand your situation and I'm happy to help. According to our refund policy, we can offer a partial refund for unused sessions. Since you've attended 2 out of 24 sessions, we can process a refund for the remaining 22 sessions. I'll need to verify your account details first. Could you please provide your order number or the email address used for the purchase? Once confirmed, I'll initiate the refund process which typically takes 5-7 business days to appear in your account. Best regards, Sarah from the Billing Team",
    sentBy: "admin",
    sentAt: "2025-01-13T14:30:00Z"
  },
  {
    id: "reply_002",
    messageId: "msg_008",
    content: "Hi James, thank you for your interest in our mentorship programs! Yes, we do offer special pricing for students. We have a 20% discount on all our programs for verified students. To qualify, you'll need to provide proof of enrollment (student ID or enrollment letter). Once verified, you'll receive a discount code that you can use during checkout. The career guidance sessions are particularly popular among students, and we have several mentors who specialize in helping students transition into their chosen fields. Would you like me to send you more information about our student programs? Best regards, Maria from the Student Support Team",
    sentBy: "admin",
    sentAt: "2025-01-08T11:45:00Z"
  }
];

// Sample message templates
export const messageTemplates: MessageTemplate[] = [
  {
    id: "template_001",
    name: "General Inquiry Response",
    subject: "Thank you for contacting Tiny Steps A Day",
    content: "Hi {{name}},\n\nThank you for reaching out to us. We've received your message and our team will review it shortly.\n\nWe typically respond to inquiries within 24 hours during business days. If your inquiry is urgent, please don't hesitate to call us at +250 780 599 859.\n\nIn the meantime, you might find answers to common questions in our FAQ section: https://tinystepsaday.com/faq\n\nBest regards,\nThe Tiny Steps A Day Team",
    category: "general",
    isDefault: true,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "template_002",
    name: "Technical Support Response",
    subject: "We're working on your technical issue",
    content: "Hi {{name}},\n\nThank you for reporting this technical issue. We understand how frustrating this can be, and we're here to help.\n\nOur technical team has been notified and is investigating the problem. We'll provide you with an update as soon as we have more information.\n\nIn the meantime, you can try these troubleshooting steps:\n1. Clear your browser cache and cookies\n2. Try accessing the site from a different browser\n3. Check if you're using the latest version of your browser\n\nIf the issue persists, please let us know and we'll escalate it to our development team.\n\nWe appreciate your patience.\n\nBest regards,\nTechnical Support Team",
    category: "technical",
    isDefault: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "template_003",
    name: "Mentorship Inquiry Response",
    subject: "Information about our mentorship programs",
    content: "Hi {{name}},\n\nThank you for your interest in our mentorship programs! We're excited to help you on your journey.\n\nOur mentorship programs are designed to provide personalized guidance and support. Here's a quick overview:\n\n• 1-on-1 Sessions: Personalized guidance tailored to your specific goals\n• Group Programs: Learn alongside like-minded individuals\n• Career Guidance: Specialized support for career transitions and growth\n• Life Coaching: Holistic approach to personal development\n\nYou can find detailed information about our programs and pricing on our website: https://tinystepsaday.com/programs\n\nWould you like to schedule a free consultation call to discuss your specific needs and find the best program for you?\n\nBest regards,\nMentorship Team",
    category: "mentorship",
    isDefault: false,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z"
  }
];

// Helper functions
export function getMessages(): ContactMessage[] {
  return sampleMessages;
}

export function getMessageById(id: string): ContactMessage | undefined {
  return sampleMessages.find(message => message.id === id);
}

export function getRepliesByMessageId(messageId: string): MessageReply[] {
  return sampleReplies.filter(reply => reply.messageId === messageId);
}

export function getMessagesByStatus(status: ContactMessage['status']): ContactMessage[] {
  return sampleMessages.filter(message => message.status === status);
}

export function getMessagesByCategory(category: ContactMessage['category']): ContactMessage[] {
  return sampleMessages.filter(message => message.category === category);
}

export function getMessagesByPriority(priority: ContactMessage['priority']): ContactMessage[] {
  return sampleMessages.filter(message => message.priority === priority);
}

export function searchMessages(query: string): ContactMessage[] {
  const lowercaseQuery = query.toLowerCase();
  return sampleMessages.filter(message => 
    message.name.toLowerCase().includes(lowercaseQuery) ||
    message.email.toLowerCase().includes(lowercaseQuery) ||
    message.subject.toLowerCase().includes(lowercaseQuery) ||
    message.message.toLowerCase().includes(lowercaseQuery) ||
    message.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
} 

export function getMessageTemplates(): MessageTemplate[] {
  return messageTemplates;
}

export function getTemplateById(id: string): MessageTemplate | undefined {
  return messageTemplates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: string): MessageTemplate[] {
  return messageTemplates.filter(template => template.category === category);
}

export function getDefaultTemplate(): MessageTemplate | undefined {
  return messageTemplates.find(template => template.isDefault);
}

export function searchTemplates(query: string): MessageTemplate[] {
  const lowercaseQuery = query.toLowerCase();
  return messageTemplates.filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.subject.toLowerCase().includes(lowercaseQuery) ||
    template.content.toLowerCase().includes(lowercaseQuery)
  );
}