import { Metadata } from "next";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { getGalleryImages } from "@/data/gallery";
import { sharedMetadata } from "../../shared-metadata";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore moments from our events, workshops, and community gatherings. View our collection of inspiring images showcasing our journey and community.",
  keywords: [
    "gallery",
    "events gallery",
    "workshop photos",
    "community gatherings",
    "mindfulness events",
    "meditation workshops",
    "wellness photos",
    "personal growth",
    "community photos"
  ],
  openGraph: {
    title: "Gallery | Tiny Steps A Day",
    description: "Explore moments from our events, workshops, and community gatherings. View our collection of inspiring images.",
    url: `${sharedMetadata.metadataBase}/gallery`,
    images: [sharedMetadata.openGraph.images[0]],
    siteName: sharedMetadata.openGraph.siteName,
    locale: sharedMetadata.openGraph.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Gallery | Tiny Steps A Day",
    description: "Explore moments from our events, workshops, and community gatherings. View our collection of inspiring images.",
    images: [sharedMetadata.twitter.images[0]],
  },
  alternates: {
    canonical: `${sharedMetadata.metadataBase}/gallery`,
  },
  robots: sharedMetadata.robots,
};

export default function GalleryPage() {
  const images = getGalleryImages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Tiny Steps A Day Gallery",
    description: "Explore moments from our events, workshops, and community gatherings",
    url: `${sharedMetadata.metadataBase}/gallery`,
    image: images.map(img => ({
      "@type": "ImageObject",
      contentUrl: img.src,
      name: img.title || img.alt,
      description: img.description || img.alt,
    })),
    publisher: {
      "@type": "Organization",
      name: "Tiny Steps A Day",
      url: sharedMetadata.metadataBase.toString(),
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-2 mb-8 mt-16 md:mt-24">
          <h1 className="text-4xl md:text-5xl dark:text-primary text-slate-700 font-bold">Gallery</h1>
        </div>

        <GalleryLightbox images={images} />
      </div>
    </div>
  );
}
