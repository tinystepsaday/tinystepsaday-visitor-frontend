"use client";

import { useState } from "react";
import { 
  ShoppingCart, 
  ChevronLeft, 
  Truck, 
  Shield, 
  ArrowRight,
  Minus,
  Plus,
  Check,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StarRating from "@/components/ratings/StarRating";
import ProductReview from "@/components/ratings/ProductReview";
import ReviewForm from "@/components/ratings/ReviewForm";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({ product, relatedProducts }: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast.success(`${quantity} x ${product.name} added to your shopping cart.`);
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="container mx-auto py-8 px-4 mt-16 md:mt-24">
      <div className="max-w-6xl mx-auto">
        <Link href="/shop" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
                {product.inStock ? (
                  <span className="flex items-center text-green-500 text-sm">
                    <Check className="h-4 w-4 mr-1" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-500 text-sm">Out of Stock</span>
                )}
              </div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-2">
                <StarRating initialRating={product.averageRating} readOnly size={18} />
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.averageRating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            </div>

            <p className="text-muted-foreground">{product.detailedDescription}</p>

            <div className="space-y-4">
              <h3 className="font-semibold">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t">
              <div className="flex items-center mb-4">
                <label htmlFor="quantity" className="mr-4 font-medium">Quantity:</label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    disabled={quantity <= 1}
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="secondary" className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-muted-foreground">On orders over $75</p>
                </div>
              </div>
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">30-Day Returns</h4>
                  <p className="text-sm text-muted-foreground">Satisfaction guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="w-full justify-start flex-wrap md:flex-nowrap">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">{product.detailedDescription}</p>
              <h3 className="text-lg font-semibold">Features</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Specifications</h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="text-muted-foreground">{spec}</li>
                ))}
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Shipping Information</h3>
              <p className="text-muted-foreground">
                We ship worldwide using trusted courier services. Standard shipping takes 3-5 business days within the US, and 7-14 business days for international orders. Expedited shipping options are available at checkout.
              </p>
              
              <h3 className="text-lg font-semibold">Return Policy</h3>
              <p className="text-muted-foreground">
                If you&apos;re not completely satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange. Items must be unused and in their original packaging. Return shipping costs may apply.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <StarRating initialRating={product.averageRating} readOnly size={24} />
                    <span className="ml-2 font-medium">
                      {product.averageRating.toFixed(1)} out of 5
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on {product.reviewCount} reviews
                  </p>
                </div>
                
                <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {showReviewForm ? "Cancel Review" : "Write a Review"}
                </Button>
              </div>
              
              {showReviewForm && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Write Your Review</CardTitle>
                    <CardDescription>
                      Share your experience with this product
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReviewForm 
                      productId={product.id} 
                      onReviewSubmitted={() => setShowReviewForm(false)}
                    />
                  </CardContent>
                </Card>
              )}
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="divide-y">
                    {product.reviews.map((review) => (
                      <ProductReview key={review.id} review={{ ...review, date: new Date(review.date) }} />
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    This product has no reviews yet. Be the first to leave a review!
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id}>
                  <CardHeader>
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      width={500}
                      height={500}
                      className="w-full aspect-[4/3] object-cover rounded-md mb-4"
                    />
                    <CardTitle>{relatedProduct.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-lg font-semibold">${relatedProduct.price.toFixed(2)}</p>
                      <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {relatedProduct.category}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{relatedProduct.description}</p>
                  </CardContent>
                  <CardFooter className="flex gap-2 justify-between w-full">
                    <Button variant="outline" className="w-1/2" asChild>
                      <Link href={`/shop/${relatedProduct.slug}`}>View Details</Link>
                    </Button>
                    <Button className="w-1/2" onClick={() => {
                      addItem({
                        id: relatedProduct.id,
                        name: relatedProduct.name,
                        price: relatedProduct.price,
                        image: relatedProduct.image
                      });
                      toast.success(`${relatedProduct.name} added to your shopping cart.`);
                    }}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 