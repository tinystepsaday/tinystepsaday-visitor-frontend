"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Edit,
  Star,
  MessageSquare,
  TrendingUp,
  Package,
  Eye,
  CheckCircle,
  XCircle,
  Search
} from "lucide-react";
import { getProductById } from "@/data/products";
import type { Product, Review } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DetailPageLoader } from "@/components/ui/loaders";
import { ProductImageCarousel } from "@/components/shop/ProductImageCarousel";
import StarRating from "@/components/ratings/StarRating";

interface ReviewWithStatus extends Review {
  status: 'pending' | 'approved' | 'rejected';
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<ReviewWithStatus[]>([]);
  const [reviewFilter, setReviewFilter] = useState("all");
  const [reviewSearch, setReviewSearch] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productId = parseInt(params.id as string);
        const foundProduct = getProductById(productId);

        if (!foundProduct) {
          router.push("/management/products");
          return;
        }

        setProduct(foundProduct);

        // Add status to reviews for management
        const reviewsWithStatus: ReviewWithStatus[] = foundProduct.reviews.map(review => ({
          ...review,
          status: Math.random() > 0.7 ? 'pending' : Math.random() > 0.5 ? 'approved' : 'rejected'
        }));
        setReviews(reviewsWithStatus);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params.id, router]);

  const handleReviewAction = (reviewId: number, action: 'approve' | 'reject') => {
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, status: action === 'approve' ? 'approved' : 'rejected' }
        : review
    ));
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = reviewFilter === "all" || review.status === reviewFilter;
    const matchesSearch = review.user.name.toLowerCase().includes(reviewSearch.toLowerCase()) ||
      review.comment.toLowerCase().includes(reviewSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const reviewStats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
  };

  if (loading || !product) {
    return <DetailPageLoader
      title="Product Details"
      subtitle="Loading product information"
      backHref="/management/products"
      backText="Back to Products"
      actionButtons={
        <Button disabled>
          <Edit className="mr-2 h-4 w-4" />
          Edit Product
        </Button>
      }
    />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4 w-full flex-col">
          <div className="flex items-center w-full justify-between">
            <Button variant="outline" size="sm" onClick={() => router.push("/management/products")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
            <Button onClick={() => router.push(`/management/products/${product.id}/edit`)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Button>
          </div>
          <div className="flex items-start w-full justify-start flex-col">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-muted-foreground">Product ID: {product.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductImageCarousel images={product.images} productName={product.name} />
            </CardContent>
          </Card>

          {/* Product Details */}
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-lg font-medium">{product.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Price</label>
                  <p className="text-lg font-medium">${product.price.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge variant={product.inStock ? "default" : "secondary"}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <p className="text-sm">{product.description}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Detailed Description</label>
                <p className="text-sm">{product.detailedDescription}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Features</label>
                <ul className="text-sm space-y-1 mt-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Specifications</label>
                <ul className="text-sm space-y-1 mt-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-500" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Sidebar */}
        <div className="space-y-6">
          {/* Product Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Product Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">Average Rating</span>
                </div>
                <span className="text-lg font-bold">{product.averageRating.toFixed(1)}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Total Reviews</span>
                </div>
                <span className="text-lg font-bold">{product.reviewCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">Views</span>
                </div>
                <span className="text-lg font-bold">1,234</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Sales</span>
                </div>
                <span className="text-lg font-bold">89</span>
              </div>
            </CardContent>
          </Card>

          {/* Review Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Review Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Reviews</span>
                <Badge variant="outline">{reviewStats.total}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending</span>
                <Badge variant="secondary">{reviewStats.pending}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Approved</span>
                <Badge variant="default">{reviewStats.approved}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Rejected</span>
                <Badge variant="destructive">{reviewStats.rejected}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Management */}
      <Card>
        <CardHeader>
          <CardTitle>Reviews Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Reviews ({reviewStats.total})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({reviewStats.pending})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({reviewStats.approved})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({reviewStats.rejected})</TabsTrigger>
            </TabsList>

            <div className="mt-6 space-y-4">
              {/* Filters */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reviews..."
                      value={reviewSearch}
                      onChange={(e) => setReviewSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={reviewFilter} onValueChange={setReviewFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-sm font-medium">
                                  {review.user.name.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{review.user.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <StarRating initialRating={review.rating} readOnly size={16} />
                            <Badge variant={
                              review.status === 'approved' ? 'default' :
                                review.status === 'rejected' ? 'destructive' : 'secondary'
                            }>
                              {review.status}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-2">{review.title}</h4>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>

                        {review.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleReviewAction(review.id, 'approve')}
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReviewAction(review.id, 'reject')}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredReviews.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                    <p className="text-muted-foreground">
                      {reviewSearch || reviewFilter !== 'all'
                        ? 'Try adjusting your filters or search terms'
                        : 'This product has no reviews yet'
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
