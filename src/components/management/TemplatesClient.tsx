"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Plus,
  Search,
  Edit,
  Copy,
  Trash2,
  MessageSquare,
  Star,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { getTemplates, deleteTemplate, type MessageTemplate, type TemplatesQueryParams } from "@/integration/messageTemplates";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categoryColors = {
  GENERAL: "bg-purple-100 text-purple-800",
  SUPPORT: "bg-blue-100 text-blue-800",
  MENTORSHIP: "bg-green-100 text-green-800",
  BILLING: "bg-orange-100 text-orange-800",
  TECHNICAL: "bg-red-100 text-red-800",
  FEEDBACK: "bg-pink-100 text-pink-800"
};

export function TemplatesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current filters from URL
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentLimit = parseInt(searchParams.get('limit') || '10');
  
  // State
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTemplates, setTotalTemplates] = useState(0);

  // Fetch all templates and handle client-side pagination
  const fetchTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: TemplatesQueryParams = {};
      
      if (currentCategory !== 'all') params.category = currentCategory as TemplatesQueryParams['category'];

      const response = await getTemplates(params);
      if (response) {
        // Client-side filtering and pagination
        let filteredTemplates = response;
        
        // Apply search filter
        if (currentSearch) {
          filteredTemplates = filteredTemplates.filter(template => 
            template.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            template.subject.toLowerCase().includes(currentSearch.toLowerCase()) ||
            template.content.toLowerCase().includes(currentSearch.toLowerCase())
          );
        }
        
        setTotalTemplates(filteredTemplates.length);
        setTotalPages(Math.ceil(filteredTemplates.length / currentLimit));
        
        // Apply pagination
        const startIndex = (currentPage - 1) * currentLimit;
        const endIndex = startIndex + currentLimit;
        const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);
        
        setTemplates(paginatedTemplates);
      } else {
        toast.error('Failed to fetch templates');
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast.error('Failed to fetch templates');
    } finally {
      setIsLoading(false);
    }
  }, [currentSearch, currentCategory, currentPage, currentLimit]);

  // Update URL params
  const updateSearchParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === 'all' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    // Reset to page 1 when filters change
    if (Object.keys(updates).some(key => key !== 'page' && key !== 'limit')) {
      params.set('page', '1');
    }
    
    router.push(`?${params.toString()}`);
  };

  // Effects
  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  // Since we're now using server-side filtering, we don't need client-side filtering
  const filteredTemplates = templates;

  const handleCopyTemplate = (template: MessageTemplate) => {
    const templateText = `Subject: ${template.subject}\n\nContent:\n${template.content}`;
    navigator.clipboard.writeText(templateText);
    toast.success("Template copied to clipboard");
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      const response = await deleteTemplate(templateId);
      if (response.success) {
        setTemplates(templates.filter(t => t.id !== templateId));
        toast.success("Template deleted");
      } else {
        toast.error("Failed to delete template");
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error("Failed to delete template");
    }
  };

  const handleSetDefault = (templateId: string) => {
    setTemplates(templates.map(t => ({
      ...t,
      isDefault: t.id === templateId
    })));
    toast.success("Default template updated");
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Message Templates</h1>
          <p className="text-muted-foreground">
            Create and manage message templates for quick responses
          </p>
        </div>
        <Button onClick={() => router.push("/management/templates/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={currentSearch}
                  onChange={(e) => updateSearchParams({ search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <Select value={currentCategory} onValueChange={(value) => updateSearchParams({ category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="GENERAL">General</SelectItem>
                  <SelectItem value="SUPPORT">Support</SelectItem>
                  <SelectItem value="MENTORSHIP">Mentorship</SelectItem>
                  <SelectItem value="BILLING">Billing</SelectItem>
                  <SelectItem value="TECHNICAL">Technical</SelectItem>
                  <SelectItem value="FEEDBACK">Feedback</SelectItem>
                </SelectContent>
              </Select>
              <Select value={currentLimit.toString()} onValueChange={(value) => updateSearchParams({ limit: value, page: '1' })}>
                <SelectTrigger className="w-fit">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading templates...</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
          <Card key={template.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 flex-wrap">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      <MessageSquare className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{template.name}</CardTitle>
                    <CardDescription className="truncate">{template.subject}</CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => router.push(`/management/templates/${template.id}/edit`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleCopyTemplate(template)}>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </DropdownMenuItem>
                    {!template.isDefault && (
                      <DropdownMenuItem onClick={() => handleSetDefault(template.id)}>
                        <Star className="mr-2 h-4 w-4" />
                        Set as Default
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem 
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={categoryColors[template.category as keyof typeof categoryColors]}>
                  {template.category}
                </Badge>
                {template.isDefault && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Default
                  </Badge>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground line-clamp-3">
                {template.content.replace(/\{\{name\}\}/g, "[Name]")}
              </div>

              <Separator />

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Created {formatDistanceToNow(new Date(template.createdAt), { addSuffix: true })}</span>
                <span>Updated {formatDistanceToNow(new Date(template.updatedAt), { addSuffix: true })}</span>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => router.push(`/management/templates/${template.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCopyTemplate(template)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      )}

      {filteredTemplates.length === 0 && !isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                {currentSearch || currentCategory !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first message template"
                }
              </p>
              {!currentSearch && currentCategory === "all" && (
                <Button onClick={() => router.push("/management/templates/create")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
                <span>
                  Showing {((currentPage - 1) * currentLimit) + 1} to {Math.min(currentPage * currentLimit, totalTemplates)} of {totalTemplates} templates
                </span>
                <span>•</span>
                <span>Page {currentPage} of {totalPages}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSearchParams({ page: '1' })}
                  disabled={currentPage <= 1}
                >
                  First
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSearchParams({ page: (currentPage - 1).toString() })}
                  disabled={currentPage <= 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === currentPage ? "default" : "outline"}
                        size="sm"
                        className="w-8 h-8 p-0"
                        onClick={() => updateSearchParams({ page: pageNum.toString() })}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSearchParams({ page: (currentPage + 1).toString() })}
                  disabled={currentPage >= totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateSearchParams({ page: totalPages.toString() })}
                  disabled={currentPage >= totalPages}
                >
                  Last
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}