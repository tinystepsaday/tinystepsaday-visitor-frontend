"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";
import StarRating from "@/components/ratings/StarRating";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast.success(`${product.name} added to your shopping cart.`);
  };

  return (
    <Card>
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full aspect-[4/3] object-cover rounded-md mb-4"
        />
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg font-semibold">${product.price}</p>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <div className="flex items-center mb-2">
          <StarRating initialRating={product.averageRating} readOnly size={16} />
          <span className="ml-2 text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>
        
        <p className="text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="flex gap-2 justify-between w-full">
        <Button variant="outline" className="w-1/2" asChild>
          <Link href={`/shop/${product.slug}`}>View Details</Link>
        </Button>
        <Button className="w-1/2" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
} 