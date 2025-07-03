export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
}

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    alt: "Futuristic digital grid representing technology and innovation",
    title: "Digital Innovation",
    description: "Exploring the intersection of technology and mindfulness",
    category: "technology"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    alt: "White robot symbolizing artificial intelligence and automation",
    title: "AI and Automation",
    description: "The future of work and personal development",
    category: "technology"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    alt: "Colorful code display representing programming and digital skills",
    title: "Digital Skills",
    description: "Building the foundation for digital transformation",
    category: "technology"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Person using laptop in a modern workspace",
    title: "Modern Workspace",
    description: "Creating productive and mindful work environments",
    category: "workspace"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    alt: "Laptop on glass table with clean minimalist design",
    title: "Minimalist Design",
    description: "Embracing simplicity in our digital lives",
    category: "design"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    alt: "MacBook with code editor open showing programming work",
    title: "Code and Creativity",
    description: "Where technical skills meet creative expression",
    category: "technology"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    alt: "Peaceful meditation setting with natural elements",
    title: "Mindful Moments",
    description: "Finding peace in our busy digital world",
    category: "wellness"
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    alt: "Yoga practice in a serene environment",
    title: "Wellness Practice",
    description: "Integrating physical and mental wellness",
    category: "wellness"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56",
    alt: "Stress management and relaxation techniques",
    title: "Stress Relief",
    description: "Tools and techniques for managing daily stress",
    category: "wellness"
  }
];

export function getGalleryImages(): GalleryImage[] {
  return galleryImages;
}

export function getGalleryImagesByCategory(category: string): GalleryImage[] {
  return galleryImages.filter(image => image.category === category);
} 