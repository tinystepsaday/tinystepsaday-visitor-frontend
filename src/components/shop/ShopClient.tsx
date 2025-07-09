"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ShoppingCart, Search, Filter, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "./ProductCard";
import {
  getFilteredProducts,
  getPaginatedProducts,
  getUniqueCategories,
  getPriceRange,
} from "@/data/products";

const ITEMS_PER_PAGE = 9;

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current search parameters
  const currentPage = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;
  const minRating = searchParams.get("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined;
  const inStock = searchParams.get("inStock") === "true";
  const sortBy = searchParams.get("sortBy") as "name" | "price" | "rating" | "newest" || undefined;
  const sortOrder = searchParams.get("sortOrder") as "asc" | "desc" || "asc";

  // Get available categories and price range
  const categories = getUniqueCategories();
  const priceRange = getPriceRange();

  // Filter and paginate products
  const filteredProducts = useMemo(() => {
    return getFilteredProducts({
      search: searchQuery,
      category: categoryFilter,
      minPrice,
      maxPrice,
      minRating,
      inStock: inStock ? true : undefined,
      sortBy,
      sortOrder,
    });
  }, [searchQuery, categoryFilter, minPrice, maxPrice, minRating, inStock, sortBy, sortOrder]);

  const { products: paginatedProducts, totalPages, totalProducts } = useMemo(() => {
    return getPaginatedProducts(filteredProducts, currentPage, ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Update search parameters
  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const params = new URLSearchParams(searchParams);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      // Reset to page 1 when filters change
      if (Object.keys(updates).some(key => key !== "page")) {
        params.set("page", "1");
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [searchParams, router, pathname]
  );

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      updateSearchParams({ search: value });
    },
    [updateSearchParams]
  );

  // Handle category filter
  const handleCategoryChange = useCallback(
    (category: string) => {
      updateSearchParams({ category: category || undefined });
    },
    [updateSearchParams]
  );

  // Handle price range
  const handlePriceRangeChange = useCallback(
    (values: number[]) => {
      updateSearchParams({
        minPrice: values[0] === priceRange.min ? undefined : values[0],
        maxPrice: values[1] === priceRange.max ? undefined : values[1],
      });
    },
    [updateSearchParams, priceRange]
  );

  // Handle rating filter
  const handleRatingChange = useCallback(
    (rating: number) => {
      updateSearchParams({ minRating: rating || undefined });
    },
    [updateSearchParams]
  );

  // Handle stock filter
  const handleStockChange = useCallback(
    (checked: boolean) => {
      updateSearchParams({ inStock: checked ? "true" : undefined });
    },
    [updateSearchParams]
  );

  // Handle sorting
  const handleSortChange = useCallback(
    (sortBy: string) => {
      updateSearchParams({ sortBy: sortBy || undefined });
    },
    [updateSearchParams]
  );

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "default" : "outline"}
          size="sm"
          onClick={() => updateSearchParams({ page: i })}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <ShoppingCart className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Shop</h1>
        <Badge variant="secondary" className="ml-2">
          {totalProducts} products
        </Badge>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="lg:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <Label htmlFor="search">Search Products</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Separator />

              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Categories">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Price Range */}
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="px-2">
                  <Slider
                    value={[minPrice || priceRange.min, maxPrice || priceRange.max]}
                    onValueChange={handlePriceRangeChange}
                    max={priceRange.max}
                    min={priceRange.min}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${minPrice || priceRange.min}</span>
                    <span>${maxPrice || priceRange.max}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select
                  value={minRating?.toString() || ""}
                  onValueChange={(value) => handleRatingChange(parseFloat(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any Rating">Any Rating</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="2">2+ Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Stock Filter */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStock}
                  onCheckedChange={handleStockChange}
                />
                <Label htmlFor="inStock">In Stock Only</Label>
              </div>

              <Separator />

              {/* Sort */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={sortBy || ""} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price">Price Low to High</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              {/* Reset Filters */}
              <Button
                variant="outline"
                onClick={resetFilters}
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Active Filters */}
          {(searchQuery || categoryFilter || minPrice !== undefined || maxPrice !== undefined || minRating !== undefined || inStock) && (
            <Card>
              <CardContent className="">
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Search: {searchQuery}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateSearchParams({ search: undefined })}
                      />
                    </Badge>
                  )}
                  {categoryFilter && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Category: {categoryFilter}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateSearchParams({ category: undefined })}
                      />
                    </Badge>
                  )}
                  {(minPrice !== undefined || maxPrice !== undefined) && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Price: ${minPrice || priceRange.min} - ${maxPrice || priceRange.max}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateSearchParams({ minPrice: undefined, maxPrice: undefined })}
                      />
                    </Badge>
                  )}
                  {minRating !== undefined && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Rating: {minRating}+ stars
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateSearchParams({ minRating: undefined })}
                      />
                    </Badge>
                  )}
                  {inStock && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      In Stock Only
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => updateSearchParams({ inStock: undefined })}
                      />
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Card>
                  <CardContent className="">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{" "}
                        {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)} of{" "}
                        {totalProducts} products
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSearchParams({ page: currentPage - 1 })}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        {generatePaginationButtons()}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateSearchParams({ page: currentPage + 1 })}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 