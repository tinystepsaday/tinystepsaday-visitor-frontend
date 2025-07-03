export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactInfo {
  type: string;
  title: string;
  value: string;
  description: string;
  icon: string;
  link?: string;
}

export const contactFAQs: FAQ[] = [
  {
    question: "What services does Tiny Steps A Day offer?",
    answer: "We offer a range of services including one-on-one mentorship, group coaching, career guidance, mental health support, and digital courses focused on personal growth and transformation."
  },
  {
    question: "How do I schedule a mentorship session?",
    answer: "You can schedule a mentorship session by visiting our Programs page, selecting the type of mentorship you're interested in, and following the booking process. Alternatively, you can contact us directly through this form."
  },
  {
    question: "What is the cost of mentorship programs?",
    answer: "Our mentorship programs vary in cost depending on the type, duration, and intensity. We offer starter packages, deep dive options, and full transformation journeys. Details about pricing can be found on our Programs page."
  },
  {
    question: "Do you offer refunds if I'm not satisfied?",
    answer: "Yes, we have a satisfaction guarantee. If you're not completely satisfied with your first session, we'll offer a full refund. For ongoing programs, we handle refund requests on a case-by-case basis."
  },
  {
    question: "How long does a mentorship program typically last?",
    answer: "The duration varies based on your goals and the program you choose. Our programs range from single sessions to 3-month, 6-month, and 12-month journeys. We'll help you determine the best fit during your initial consultation."
  },
  {
    question: "Can I change mentors if I don't feel it's the right fit?",
    answer: "Absolutely. We understand the importance of a good match between mentor and mentee. If you feel your current mentor isn't the right fit, we'll help you transition to someone else at no additional cost."
  }
];

export const contactInfo: ContactInfo[] = [
  {
    type: "email",
    title: "Email Us",
    value: "hello@tinystepsaday.com",
    description: "We aim to respond within 24 hours",
    icon: "Mail",
    link: "mailto:hello@tinystepsaday.com"
  },
  {
    type: "chat",
    title: "Live Chat",
    value: "Available Monday-Friday",
    description: "9:00 AM - 5:00 PM EAT",
    icon: "MessageSquare"
  },
  {
    type: "phone",
    title: "Phone",
    value: "+250 780 599 859",
    description: "For urgent inquiries only",
    icon: "Phone",
    link: "tel:+250780599859"
  }
];

export function getContactFAQs(): FAQ[] {
  return contactFAQs;
}

export function getContactInfo(): ContactInfo[] {
  return contactInfo;
} 