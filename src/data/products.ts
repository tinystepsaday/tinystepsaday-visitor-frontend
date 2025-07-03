export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  averageRating: number;
  reviewCount: number;
  detailedDescription: string;
  features: string[];
  specifications: string[];
  inStock: boolean;
  relatedProducts: number[];
  reviews: Review[];
  slug: string;
}

export interface Review {
  id: number;
  user: {
    name: string;
    avatar?: string;
  };
  date: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Meditation Cushion",
    price: 49.99,
    description: "Comfortable cushion for your meditation practice",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    category: "Tools",
    averageRating: 4.5,
    reviewCount: 28,
    detailedDescription: "Our premium meditation cushion is designed to provide optimal comfort and support during your meditation sessions. Made with high-quality, sustainable materials, it helps maintain proper posture and alignment, reducing strain on your back, knees, and ankles. The removable cover is machine washable for easy cleaning.",
    features: [
      "Ergonomic design for proper spine alignment",
      "Filled with natural buckwheat hulls",
      "Removable, machine-washable cover",
      "Carrying handle for easy transport",
      "Available in multiple colors"
    ],
    specifications: [
      "Dimensions: 16\" diameter, 6\" height",
      "Weight: 4.5 lbs",
      "Materials: 100% organic cotton cover, buckwheat hull filling",
      "Made in USA"
    ],
    inStock: true,
    relatedProducts: [3, 6],
    slug: "meditation-cushion",
    reviews: [
      {
        id: 1,
        user: {
          name: "Alex Johnson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
        },
        date: "2025-04-10T00:00:00.000Z",
        rating: 5,
        title: "Absolutely Perfect for Daily Meditation",
        comment: "I've been using this cushion for three months now and it has dramatically improved my meditation experience. The buckwheat hulls provide just the right amount of firmness yet conform to your body. My posture is better and I can sit for longer periods without discomfort.",
        verified: true
      },
      {
        id: 2,
        user: {
          name: "Sarah Miller"
        },
        date: "2025-04-05T00:00:00.000Z",
        rating: 4,
        title: "Great Quality, Wish It Came in More Colors",
        comment: "The quality of this meditation cushion is excellent. The fabric feels durable and the stitching is solid. My only wish is that it came in more color options to match my space. Otherwise, it's perfect and has helped my practice tremendously.",
        verified: true
      },
      {
        id: 3,
        user: {
          name: "Michael Chen"
        },
        date: "2025-03-22T00:00:00.000Z",
        rating: 5,
        title: "Worth Every Penny",
        comment: "As someone who struggled with back pain during meditation, this cushion has been a game-changer. The elevation helps maintain proper alignment and the buckwheat filling offers the perfect balance of support and comfort. Highly recommend!",
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: "Mindfulness Journal",
    price: 24.99,
    description: "Beautiful journal for daily reflections",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    category: "Books",
    averageRating: 4.2,
    reviewCount: 15,
    detailedDescription: "A thoughtfully designed journal to support your mindfulness journey. This premium journal features guided prompts, reflection questions, and space for daily gratitude practice. The high-quality paper prevents ink bleeding, and the durable cover ensures it will last through your entire practice.",
    features: [
      "Guided prompts for daily reflection",
      "Gratitude practice sections",
      "High-quality, acid-free paper",
      "Lay-flat binding for easy writing",
      "Elastic closure band"
    ],
    specifications: [
      "Dimensions: 6\" x 8.5\"",
      "Pages: 200 lined pages",
      "Paper: 100gsm acid-free",
      "Cover: Hardcover with cloth binding"
    ],
    inStock: true,
    relatedProducts: [4, 5],
    slug: "mindfulness-journal",
    reviews: [
      {
        id: 4,
        user: {
          name: "Emma Wilson"
        },
        date: "2025-04-08T00:00:00.000Z",
        rating: 4,
        title: "Beautiful and Practical",
        comment: "This journal has become an essential part of my daily routine. The prompts are thoughtful and help me reflect more deeply. The paper quality is excellent and the binding is sturdy.",
        verified: true
      }
    ]
  },
  {
    id: 3,
    name: "Essential Oil Set",
    price: 39.99,
    description: "Calming essential oils for aromatherapy",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    category: "Tools",
    averageRating: 4.7,
    reviewCount: 42,
    detailedDescription: "A carefully curated collection of premium essential oils designed to support your mindfulness and meditation practice. Each oil is 100% pure and therapeutic grade, sourced from the finest ingredients around the world.",
    features: [
      "100% pure therapeutic grade oils",
      "Includes lavender, eucalyptus, and chamomile",
      "Glass bottles with dropper caps",
      "Comes with usage guide",
      "Sustainably sourced ingredients"
    ],
    specifications: [
      "Contents: 3 x 10ml bottles",
      "Oils: Lavender, Eucalyptus, Chamomile",
      "Bottle material: Amber glass",
      "Origin: Various countries"
    ],
    inStock: true,
    relatedProducts: [1, 6],
    slug: "essential-oil-set",
    reviews: [
      {
        id: 5,
        user: {
          name: "Lisa Thompson"
        },
        date: "2025-04-12T00:00:00.000Z",
        rating: 5,
        title: "Amazing Quality Oils",
        comment: "These oils are incredibly pure and potent. I use them daily in my meditation practice and they create such a peaceful atmosphere. The lavender is especially calming.",
        verified: true
      }
    ]
  },
  {
    id: 4,
    name: "Self-Improvement Handbook",
    price: 19.99,
    description: "Practical guide for personal growth and mindfulness",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Handbooks",
    averageRating: 4.0,
    reviewCount: 19,
    detailedDescription: "A comprehensive guide to personal development and mindfulness practices. This handbook combines practical exercises with theoretical knowledge to help you build lasting habits and achieve your personal growth goals.",
    features: [
      "Practical exercises and worksheets",
      "30-day challenge programs",
      "Progress tracking tools",
      "Expert insights and tips",
      "Printable resources included"
    ],
    specifications: [
      "Pages: 250",
      "Format: Paperback",
      "Language: English",
      "Publisher: TinyStepsADay"
    ],
    inStock: true,
    relatedProducts: [2, 5],
    slug: "self-improvement-handbook",
    reviews: [
      {
        id: 6,
        user: {
          name: "David Rodriguez"
        },
        date: "2025-04-01T00:00:00.000Z",
        rating: 4,
        title: "Great Resource for Beginners",
        comment: "This handbook is perfect for anyone starting their self-improvement journey. The exercises are practical and the 30-day challenges are motivating.",
        verified: true
      }
    ]
  },
  {
    id: 5,
    name: "Yoga Guide Book",
    price: 34.99,
    description: "Comprehensive guide to yoga poses and practices",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    category: "Books",
    averageRating: 4.8,
    reviewCount: 31,
    detailedDescription: "An extensive guide to yoga practice, featuring detailed instructions for over 100 poses, breathing techniques, and meditation practices. Perfect for both beginners and experienced practitioners looking to deepen their practice.",
    features: [
      "100+ detailed pose instructions",
      "Step-by-step illustrations",
      "Breathing techniques guide",
      "Meditation practices included",
      "Practice sequences for different levels"
    ],
    specifications: [
      "Pages: 320",
      "Format: Hardcover",
      "Illustrations: 200+ photos",
      "Language: English"
    ],
    inStock: true,
    relatedProducts: [2, 4],
    slug: "yoga-guide-book",
    reviews: [
      {
        id: 7,
        user: {
          name: "Jennifer Lee"
        },
        date: "2025-04-15T00:00:00.000Z",
        rating: 5,
        title: "Comprehensive and Beautiful",
        comment: "This yoga guide is absolutely stunning. The photographs are clear and the instructions are easy to follow. It's become my go-to resource for my daily practice.",
        verified: true
      }
    ]
  },
  {
    id: 6,
    name: "Meditation Timer",
    price: 29.99,
    description: "Simple tool to track your meditation sessions",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Tools",
    averageRating: 3.9,
    reviewCount: 12,
    detailedDescription: "A beautifully designed meditation timer that helps you maintain consistent practice sessions. Features gentle chimes, customizable intervals, and a minimalist design that won't distract from your practice.",
    features: [
      "Gentle chime sounds",
      "Customizable intervals",
      "Battery-powered operation",
      "Compact, portable design",
      "Silent vibration option"
    ],
    specifications: [
      "Dimensions: 3\" x 3\" x 1\"",
      "Battery: 1 AA battery (included)",
      "Material: Bamboo and metal",
      "Warranty: 1 year"
    ],
    inStock: true,
    relatedProducts: [1, 3],
    slug: "meditation-timer",
    reviews: [
      {
        id: 8,
        user: {
          name: "Robert Kim"
        },
        date: "2025-03-28T00:00:00.000Z",
        rating: 4,
        title: "Simple and Effective",
        comment: "This timer is perfect for my meditation practice. The chime is gentle and not jarring, and the design is beautiful. It's helped me maintain consistent session lengths.",
        verified: true
      }
    ]
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getRelatedProducts(productId: number): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  
  return product.relatedProducts
    .map(id => getProductById(id))
    .filter((product): product is Product => product !== undefined);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}

export function getAllProducts(): Product[] {
  return products;
} 