"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, MoreHorizontal, Edit, Trash2, Eye, DollarSign, Users, TrendingUp, X, Copy, Star } from "lucide-react";
import { getEnhancedPricingTiers, getPricingStats, deletePricingTier, type PricingTierEnhanced } from "@/data/pricing";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListPageLoader } from "@/components/ui/loaders";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

export default function PricingTablePage() {
  const [pricingTiers, setPricingTiers] = useState<PricingTierEnhanced[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState<ReturnType<typeof getPricingStats> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadPricingTiers = async () => {
      try {
        const tiers = await getEnhancedPricingTiers();
        setPricingTiers(tiers);
        const pricingStats = getPricingStats();
        setStats(pricingStats);
      } catch (error) {
        console.error("Error loading pricing tiers:", error);
        toast.error("Failed to load pricing tiers");
      } finally {
        setLoading(false);
      }
    };

    loadPricingTiers();
  }, []);

  const filteredTiers = pricingTiers.filter(tier => {
    const matchesSearch = tier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tier.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All Status" || !statusFilter || tier.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  const hasActiveFilters = searchTerm || statusFilter;

  const handleDeleteTier = async (id: string) => {
    try {
      const success = await deletePricingTier(id);
      if (success) {
        setPricingTiers(prev => prev.filter(tier => tier.id !== id));
        toast.success("Pricing tier deleted successfully");
      } else {
        toast.error("Failed to delete pricing tier");
      }
    } catch (error) {
      console.error("Error deleting tier:", error);
      toast.error("Failed to delete pricing tier");
    }
  };

  const handleDuplicateTier = (tier: PricingTierEnhanced) => {
    const duplicatedTier = {
      ...tier,
      id: `tier-${Date.now()}`,
      name: `${tier.name} (Copy)`,
      slug: `${tier.slug}-copy`,
      status: 'draft' as const,
      sortOrder: pricingTiers.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setPricingTiers(prev => [...prev, duplicatedTier]);
    toast.success("Pricing tier duplicated successfully");
  };

  const columns: ColumnDef<PricingTierEnhanced>[] = [
    {
      accessorKey: "name",
      header: "Tier",
      cell: ({ row }) => {
        const tier = row.original;
        return (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-medium flex items-center gap-2">
                {tier.name}
                {tier.metadata?.popular && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                {tier.metadata?.bestValue && <Badge variant="secondary" className="text-xs">Best Value</Badge>}
                {tier.metadata?.featured && <Badge variant="outline" className="text-xs">Featured</Badge>}
              </div>
              <div className="text-sm text-muted-foreground">{tier.slug}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => {
        const tier = row.original;
        return (
          <div className="font-medium">
            ${tier.billingOptions.monthly.toFixed(2)}
            <span className="text-sm text-muted-foreground ml-1">/month</span>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const variants = {
          active: "default",
          inactive: "secondary",
          draft: "outline",
        } as const;
        
        return (
          <Badge variant={variants[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "sortOrder",
      header: "Order",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {row.original.sortOrder}
          </div>
        );
      },
    },
    {
      accessorKey: "features",
      header: "Features",
      cell: ({ row }) => {
        const includedFeatures = row.original.features.filter(f => f.included).length;
        const totalFeatures = row.original.features.length;
        return (
          <div className="text-sm text-muted-foreground">
            {includedFeatures}/{totalFeatures} features
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        return (
          <div className="text-sm text-muted-foreground">
            {new Date(row.original.createdAt).toLocaleDateString()}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const tier = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push(`/management/pricing-table/${tier.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/management/pricing-table/${tier.id}/edit`)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Tier
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDuplicateTier(tier)}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => handleDeleteTier(tier.id)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Tier
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return <ListPageLoader 
      title="Pricing Table" 
      subtitle="Manage your pricing tiers and access controls"
      createButtonText="Create Tier"
      createHref="/management/pricing-table/create"
    />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Table</h1>
          <p className="text-muted-foreground">
            Manage your pricing tiers and access controls
          </p>
        </div>
        <Button onClick={() => router.push("/management/pricing-table/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Tier
        </Button>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tiers</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTiers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeTiers} active, {stats.inactiveTiers} inactive
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tiers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTiers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.draftTiers} in draft
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Annual potential
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.averagePrice.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Per tier monthly
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search tiers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredTiers}
            searchKey="name"
          />
        </CardContent>
      </Card>
    </div>
  );
}
