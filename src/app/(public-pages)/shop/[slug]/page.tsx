import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/shop/ProductDetailsClient";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/data/products";

// Use the default Next.js PageProps type
interface ProductPageProps {
  params: Promise<{ slug: string }>;
}       

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const products = await getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for doesn't exist or has been removed."
    };
  }

  return {
    title: `${product.name}`,
    description: product.description,
    keywords: [product.category, product.name, "mindfulness", "meditation", "personal growth"],
    openGraph: {
      title: `${product.name} | Tiny Steps A Day`,
      description: product.description,
      type: "website",
      url: `https://tinystepsaday.com/shop/${product.slug}`,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 600,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Tiny Steps A Day`,
      description: product.description,
      images: [product.images[0]]
    }
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images[0],
    "category": product.category,
    "brand": {
      "@type": "Brand",
      "name": "TinyStepsADay"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.averageRating,
      "reviewCount": product.reviewCount,
      "bestRating": 5,
      "worstRating": 1
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "USD",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "TinyStepsADay"
      }
    },
    "review": product.reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.user.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5
      },
      "reviewBody": review.comment,
      "datePublished": new Date(review.date).toISOString()
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
