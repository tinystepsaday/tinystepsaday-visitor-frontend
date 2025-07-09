export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images: string[]; // Array of product images for carousel
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
    images: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
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
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574"
    ],
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
  },
  {
    id: 7,
    name: "Breathing Exercise Cards",
    price: 14.99,
    description: "Deck of cards with guided breathing exercises",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    ],
    category: "Tools",
    averageRating: 4.3,
    reviewCount: 8,
    detailedDescription: "A beautifully illustrated deck of 50 breathing exercise cards designed to help you master various breathing techniques for relaxation, focus, and stress relief. Each card includes step-by-step instructions and benefits.",
    features: [
      "50 different breathing exercises",
      "Step-by-step instructions",
      "Beautiful illustrations",
      "Portable card deck",
      "Includes benefits for each exercise"
    ],
    specifications: [
      "Cards: 50 cards",
      "Size: 3.5\" x 2.5\"",
      "Material: Premium cardstock",
      "Box: Sturdy storage box included"
    ],
    inStock: true,
    relatedProducts: [1, 3],
    slug: "breathing-exercise-cards",
    reviews: [
      {
        id: 9,
        user: {
          name: "Maria Garcia"
        },
        date: "2025-04-18T00:00:00.000Z",
        rating: 5,
        title: "Perfect for Daily Practice",
        comment: "These cards are wonderful! I use them daily and they've helped me develop a consistent breathing practice. The illustrations are calming and the instructions are clear.",
        verified: true
      }
    ]
  },
  {
    id: 8,
    name: "Gratitude Practice Workbook",
    price: 18.99,
    description: "Structured workbook for cultivating gratitude",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335"
    ],
    category: "Books",
    averageRating: 4.6,
    reviewCount: 22,
    detailedDescription: "A comprehensive workbook designed to help you develop a daily gratitude practice. Features guided exercises, reflection prompts, and tracking tools to help you cultivate appreciation and positive thinking.",
    features: [
      "90-day gratitude challenge",
      "Daily reflection prompts",
      "Gratitude journaling space",
      "Progress tracking tools",
      "Scientific benefits explained"
    ],
    specifications: [
      "Pages: 180",
      "Format: Spiral-bound",
      "Size: 8.5\" x 11\"",
      "Paper: High-quality, acid-free"
    ],
    inStock: true,
    relatedProducts: [2, 4],
    slug: "gratitude-practice-workbook",
    reviews: [
      {
        id: 10,
        user: {
          name: "Thomas Anderson"
        },
        date: "2025-04-20T00:00:00.000Z",
        rating: 5,
        title: "Transformed My Perspective",
        comment: "This workbook has completely changed how I view my daily life. The exercises are simple but powerful, and I've noticed a significant improvement in my overall mood and outlook.",
        verified: true
      }
    ]
  },
  {
    id: 9,
    name: "Stress Relief Tea Collection",
    price: 27.99,
    description: "Curated collection of calming herbal teas",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f"
    ],
    category: "Tools",
    averageRating: 4.4,
    reviewCount: 16,
    detailedDescription: "A carefully selected collection of premium herbal teas designed to support relaxation and stress relief. Each blend is crafted with organic ingredients and traditional recipes for maximum effectiveness.",
    features: [
      "5 different calming blends",
      "Organic ingredients",
      "Caffeine-free options",
      "Includes brewing guide",
      "Eco-friendly packaging"
    ],
    specifications: [
      "Contents: 5 x 20 tea bags",
      "Total: 100 tea bags",
      "Ingredients: Organic herbs",
      "Origin: Various countries"
    ],
    inStock: true,
    relatedProducts: [3, 7],
    slug: "stress-relief-tea-collection",
    reviews: [
      {
        id: 11,
        user: {
          name: "Amanda Foster"
        },
        date: "2025-04-22T00:00:00.000Z",
        rating: 4,
        title: "Delicious and Soothing",
        comment: "These teas are absolutely delicious and really help me unwind after a long day. The chamomile blend is my favorite. Great quality and the packaging is beautiful.",
        verified: true
      }
    ]
  },
  {
    id: 10,
    name: "Mindful Living Planner",
    price: 32.99,
    description: "Comprehensive planner for mindful daily living",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
    images: [
      "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    ],
    category: "Handbooks",
    averageRating: 4.7,
    reviewCount: 14,
    detailedDescription: "A comprehensive planner that combines traditional planning with mindfulness practices. Features goal setting, habit tracking, reflection prompts, and space for daily intentions and gratitude.",
    features: [
      "12-month planning system",
      "Goal setting worksheets",
      "Habit tracking pages",
      "Monthly reflection prompts",
      "Gratitude and intention spaces"
    ],
    specifications: [
      "Pages: 240",
      "Format: Hardcover",
      "Size: 7\" x 9\"",
      "Binding: Lay-flat design"
    ],
    inStock: true,
    relatedProducts: [2, 8],
    slug: "mindful-living-planner",
    reviews: [
      {
        id: 12,
        user: {
          name: "Rachel Green"
        },
        date: "2025-04-25T00:00:00.000Z",
        rating: 5,
        title: "Perfect Balance of Planning and Mindfulness",
        comment: "This planner is exactly what I was looking for. It helps me stay organized while also encouraging mindfulness practices. The layout is beautiful and the prompts are thoughtful.",
        verified: true
      }
    ]
  },
  {
    id: 11,
    name: "Sound Healing Bowl",
    price: 89.99,
    description: "Handcrafted singing bowl for meditation and healing",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
    images: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574"
    ],
    category: "Tools",
    averageRating: 4.9,
    reviewCount: 7,
    detailedDescription: "A handcrafted singing bowl made from seven metals, designed to produce pure, healing tones for meditation and sound therapy. Each bowl is unique and creates beautiful harmonics.",
    features: [
      "Handcrafted from seven metals",
      "Pure, healing tones",
      "Includes wooden mallet",
      "Beautiful craftsmanship",
      "Comes with care instructions"
    ],
    specifications: [
      "Diameter: 6 inches",
      "Height: 3 inches",
      "Material: Seven-metal alloy",
      "Weight: 2.2 lbs",
      "Origin: Nepal"
    ],
    inStock: true,
    relatedProducts: [1, 6],
    slug: "sound-healing-bowl",
    reviews: [
      {
        id: 13,
        user: {
          name: "Sophie Chen"
        },
        date: "2025-04-28T00:00:00.000Z",
        rating: 5,
        title: "Absolutely Magical",
        comment: "This singing bowl produces the most beautiful, pure tones. It's become an essential part of my meditation practice. The craftsmanship is incredible and the sound is truly healing.",
        verified: true
      }
    ]
  },
  {
    id: 12,
    name: "Digital Wellness Guide",
    price: 22.99,
    description: "Guide to maintaining mindfulness in the digital age",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    images: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ],
    category: "Books",
    averageRating: 4.1,
    reviewCount: 11,
    detailedDescription: "A practical guide to maintaining mindfulness and mental well-being in our increasingly digital world. Learn strategies for digital detox, mindful technology use, and creating healthy boundaries.",
    features: [
      "Digital detox strategies",
      "Mindful technology use",
      "Screen time management",
      "Digital wellness exercises",
      "Real-world case studies"
    ],
    specifications: [
      "Pages: 180",
      "Format: Paperback",
      "Language: English",
      "Publisher: TinyStepsADay"
    ],
    inStock: true,
    relatedProducts: [4, 10],
    slug: "digital-wellness-guide",
    reviews: [
      {
        id: 14,
        user: {
          name: "Kevin Martinez"
        },
        date: "2025-05-01T00:00:00.000Z",
        rating: 4,
        title: "Timely and Practical",
        comment: "This guide came at the perfect time for me. I was struggling with my relationship with technology and this book provided practical strategies that I could implement immediately.",
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

// New functions for filtering and searching
export function getFilteredProducts(params: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'rating' | 'newest';
  sortOrder?: 'asc' | 'desc';
}): Product[] {
  let filteredProducts = [...products];

  // Search filter
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  if (params.category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category === params.category
    );
  }

  // Price range filter
  if (params.minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.price >= params.minPrice!
    );
  }
  if (params.maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.price <= params.maxPrice!
    );
  }

  // Rating filter
  if (params.minRating !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.averageRating >= params.minRating!
    );
  }

  // Stock filter
  if (params.inStock !== undefined) {
    filteredProducts = filteredProducts.filter(product =>
      product.inStock === params.inStock
    );
  }

  // Sorting
  if (params.sortBy) {
    filteredProducts.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (params.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.averageRating;
          bValue = b.averageRating;
          break;
        case 'newest':
          // Assuming newer products have higher IDs
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          return 0;
      }

      if (params.sortOrder === 'desc') {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });
  }

  return filteredProducts;
}

export function getPaginatedProducts(
  products: Product[],
  page: number,
  pageSize: number
): { products: Product[]; totalPages: number; totalProducts: number } {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = products.slice(startIndex, endIndex);
  
  return {
    products: paginatedProducts,
    totalPages: Math.ceil(products.length / pageSize),
    totalProducts: products.length
  };
}

export function getUniqueCategories(): string[] {
  return [...new Set(products.map(product => product.category))];
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products.map(product => product.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
} 