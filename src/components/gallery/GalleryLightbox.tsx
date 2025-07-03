"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
}

export const GalleryLightbox = ({ images }: GalleryLightboxProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, images]);

  const openLightbox = (id: number) => {
    setSelectedImage(id);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      const currentIndex = images.findIndex(img => img.id === selectedImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setSelectedImage(images[nextIndex].id);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      const currentIndex = images.findIndex(img => img.id === selectedImage);
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setSelectedImage(images[prevIndex].id);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  const selectedImageData = selectedImage !== null 
    ? images.find(img => img.id === selectedImage) 
    : null;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="group relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-all duration-300 cursor-pointer bg-muted"
            onClick={() => openLightbox(image.id)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay with image info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                {image.title && (
                  <h3 className="text-sm font-semibold mb-1">{image.title}</h3>
                )}
                {image.description && (
                  <p className="text-xs text-gray-200 line-clamp-2">{image.description}</p>
                )}
              </div>
            </div>
            
            {/* Category badge */}
            {image.category && (
              <div className="absolute top-2 right-2">
                <span className="px-2 py-1 text-xs bg-white/20 backdrop-blur-sm rounded-full text-white">
                  {image.category}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && selectedImageData && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center p-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-4 right-4 text-white z-10 hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center justify-between w-full h-full max-w-5xl">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={goToPrevious}
              >
                <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
              </Button>
              
              <div className="flex-1 flex items-center justify-center h-full px-4">
                <div className="relative max-h-[80vh] max-w-full">
                  <Image 
                    src={selectedImageData?.src} 
                    alt={selectedImageData?.alt} 
                    className="max-h-[80vh] max-w-full object-contain"
                    width={1200}
                    height={800}
                    priority
                  />
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20"
                onClick={goToNext}
              >
                <ChevronRight className="h-8 w-8 md:h-12 md:w-12" />
              </Button>
            </div>
            
            <div className="text-white text-center mt-4 max-w-2xl">
              {selectedImageData?.title && (
                <h3 className="text-lg font-semibold mb-2">{selectedImageData.title}</h3>
              )}
              {selectedImageData?.description && (
                <p className="text-sm text-gray-300 mb-2">{selectedImageData.description}</p>
              )}
              <p className="text-xs text-gray-400">{selectedImageData?.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 