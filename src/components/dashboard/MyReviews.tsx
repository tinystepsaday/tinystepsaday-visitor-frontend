"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Edit2, Trash2 } from "lucide-react";
import StarRating from "@/components/ratings/StarRating";
import ReviewForm from "@/components/ratings/ReviewForm";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const MyReviews = () => {
  const [isReviewSheetOpen, setIsReviewSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<any>(null);

  // Mock purchased products with review status
  const purchasedProducts = [
    {
      id: 1,
      name: "Meditation Cushion",
      purchaseDate: "April 15, 2025",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      hasReviewed: true,
      review: {
        id: 101,
        rating: 5,
        title: "Excellent quality",
        comment: "This meditation cushion has improved my practice significantly. Very comfortable and well-made.",
        date: "April 18, 2025"
      }
    },
    {
      id: 3,
      name: "Essential Oil Set",
      purchaseDate: "April 10, 2025",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      hasReviewed: false,
      review: null
    },
    {
      id: 5,
      name: "Yoga Guide Book",
      purchaseDate: "March 30, 2025",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      hasReviewed: true,
      review: {
        id: 102,
        rating: 4,
        title: "Very helpful guide",
        comment: "The illustrations are clear and the instructions are easy to follow. Great for beginners!",
        date: "April 5, 2025"
      }
    },
  ];

  const handleAddReview = (product: typeof purchasedProducts[0]) => {
    setSelectedProduct(product);
    setIsReviewSheetOpen(true);
  };

  const handleEditReview = (product: typeof purchasedProducts[0]) => {
    setSelectedProduct(product);
    setIsReviewSheetOpen(true);
  };

  const handleDeleteReview = (product: typeof purchasedProducts[0]) => {
    setReviewToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteReview = () => {
    // Simulate API call to delete review
    toast("Review Deleted");

    setIsDeleteDialogOpen(false);
    setReviewToDelete(null);
  };

  const handleReviewSubmitted = () => {
    setIsReviewSheetOpen(false);
    toast("Review Submitted");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>My Product Reviews</CardTitle>
          <CardDescription>
            Manage your product reviews and ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchasedProducts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Purchase Date</TableHead>
                  <TableHead>Review Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchasedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded overflow-hidden bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.purchaseDate}</TableCell>
                    <TableCell>
                      {product.hasReviewed ? (
                        <div>
                          <div className="flex items-center">
                            <StarRating initialRating={product.review?.rating} readOnly size={16} />
                            <span className="ml-2 text-sm">{product.review?.rating}/5</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted on {product.review?.date}
                          </p>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Not reviewed yet</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.hasReviewed ? (
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditReview(product)}
                          >
                            <Edit2 className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteReview(product)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleAddReview(product)}
                        >
                          Add Review
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                You haven&apos;t purchased any products yet.
              </p>
              <Button asChild>
                <Link href="/shop">Browse Shop</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Sheet */}
      <Sheet open={isReviewSheetOpen} onOpenChange={setIsReviewSheetOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>
              {selectedProduct?.hasReviewed ? "Edit Your Review" : "Add Your Review"}
            </SheetTitle>
            <SheetDescription>
              {selectedProduct?.name}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6">
            {selectedProduct && (
              <ReviewForm
                productId={selectedProduct.id}
                onReviewSubmitted={handleReviewSubmitted}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your review for {reviewToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteReview}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyReviews;
