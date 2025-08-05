"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Mail, 
  Reply, 
  AlertCircle,
  MessageSquare,
  Phone,
  Calendar,
  Tag,
  Eye,
  Reply as ReplyIcon,
  Archive as ArchiveIcon,
  X,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { 
  getMessages, 
  getMessageStatistics, 
  updateMessage, 
  deleteMessage, 
  bulkUpdateMessages, 
  bulkDeleteMessages,
  type ContactMessage,
  type MessagesQueryParams,
  type MessageStatistics
} from "@/integration/messages";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const priorityColors = {
  LOW: "bg-gray-100 text-gray-800",
  MEDIUM: "bg-blue-100 text-blue-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800"
};

const statusColors = {
  UNREAD: "bg-blue-100 text-blue-800",
  READ: "bg-gray-100 text-gray-800",
  REPLIED: "bg-green-100 text-green-800",
  ARCHIVED: "bg-yellow-100 text-yellow-800"
};

const categoryColors = {
  GENERAL: "bg-purple-100 text-purple-800",
  SUPPORT: "bg-blue-100 text-blue-800",
  MENTORSHIP: "bg-green-100 text-green-800",
  BILLING: "bg-orange-100 text-orange-800",
  TECHNICAL: "bg-red-100 text-red-800",
  FEEDBACK: "bg-pink-100 text-pink-800"
};

const sourceIcons = {
  CONTACT_FORM: Mail,
  EMAIL: Mail,
  PHONE: Phone,
  CHAT: MessageSquare
};

export function MessagesClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [statistics, setStatistics] = useState<MessageStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 1,
  });

  // Bulk operations state
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [bulkOperation, setBulkOperation] = useState<{
    operation: 'mark_read' | 'mark_replied' | 'archive' | 'delete';
    status?: ContactMessage['status'];
  }>({
    operation: 'mark_read',
    status: 'READ',
  });
  const [isPerformingOperation, setIsPerformingOperation] = useState(false);

  // Get current search params
  const currentSearch = searchParams.get("search") || "";
  const currentStatus = searchParams.get("status") || "all";
  const currentCategory = searchParams.get("category") || "all";
  const currentPriority = searchParams.get("priority") || "all";
  const currentSource = searchParams.get("source") || "all";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Update URL with search params
  const updateSearchParams = useCallback((params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || value === "") {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value);
      }
    });
    router.push(`?${newSearchParams.toString()}`);
  }, [router, searchParams]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const params: MessagesQueryParams = {
        page: currentPage,
        limit: 20,
        search: currentSearch || undefined,
        status: currentStatus === "all" ? undefined : currentStatus as MessagesQueryParams['status'],
        category: currentCategory === "all" ? undefined : currentCategory as MessagesQueryParams['category'],
        priority: currentPriority === "all" ? undefined : currentPriority as MessagesQueryParams['priority'],
        source: currentSource === "all" ? undefined : currentSource as MessagesQueryParams['source'],
        sortBy: "createdAt",
        sortOrder: "desc"
      };

      const result = await getMessages(params);
      if (result) {
        setMessages(result.data.messages);
        setPagination({
          total: result.data.total,
          page: result.data.page,
          limit: result.data.limit,
          totalPages: result.data.totalPages,
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  }, [currentSearch, currentStatus, currentCategory, currentPriority, currentSource, currentPage]);

  // Fetch statistics
  const fetchStatistics = useCallback(async () => {
    try {
      const stats = await getMessageStatistics();
      setStatistics(stats);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  }, []);

  // Load data on mount and when params change
  useEffect(() => {
    fetchMessages();
    fetchStatistics();
  }, [fetchMessages, fetchStatistics]);

  // Handle search
  const handleSearch = (value: string) => {
    updateSearchParams({ search: value, page: "1" });
  };

  // Handle filter changes
  const handleFilterChange = (filter: string, value: string) => {
    updateSearchParams({ [filter]: value, page: "1" });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
  };

  // Handle message selection
  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
  };

  // Handle status change
  const handleStatusChange = async (messageId: string, newStatus: ContactMessage['status']) => {
    try {
      const result = await updateMessage(messageId, { status: newStatus });
      if (result.success) {
        toast.success("Message status updated");
        fetchMessages();
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  // Handle message deletion
  const handleDeleteMessage = async (messageId: string) => {
    try {
      const result = await deleteMessage(messageId);
      if (result.success) {
        toast.success("Message deleted");
        fetchMessages();
        if (selectedMessage?.id === messageId) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message");
    }
  };

  // Handle bulk operations
  const handleBulkOperation = async () => {
    if (selectedMessages.length === 0) return;

    setIsPerformingOperation(true);
    try {
      let result;
      
      if (bulkOperation.operation === 'delete') {
        result = await bulkDeleteMessages({ messageIds: selectedMessages });
      } else {
        result = await bulkUpdateMessages({
          messageIds: selectedMessages,
          updates: { status: bulkOperation.status }
        });
      }

      if (result.success) {
        toast.success(`Successfully ${bulkOperation.operation.replace('_', ' ')} ${result.data?.affectedCount} messages`);
        setSelectedMessages([]);
        fetchMessages();
        if (selectedMessage && selectedMessages.includes(selectedMessage.id)) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error("Error performing bulk operation:", error);
      toast.error("Failed to perform bulk operation");
    } finally {
      setIsPerformingOperation(false);
      setIsBulkDialogOpen(false);
    }
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMessages(messages.map(m => m.id));
    } else {
      setSelectedMessages([]);
    }
  };

  // Handle individual message selection
  const handleMessageSelection = (messageId: string, checked: boolean) => {
    if (checked) {
      setSelectedMessages(prev => [...prev, messageId]);
    } else {
      setSelectedMessages(prev => prev.filter(id => id !== messageId));
    }
  };

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Messages</p>
                <p className="text-2xl font-bold">{statistics?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Unread</p>
                <p className="text-2xl font-bold text-blue-600">{statistics?.unread || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{statistics?.urgent || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Reply className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Replied</p>
                <p className="text-2xl font-bold text-green-600">{statistics?.replied || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Find and filter messages by various criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={currentSearch}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={currentStatus} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="UNREAD">Unread</SelectItem>
                <SelectItem value="READ">Read</SelectItem>
                <SelectItem value="REPLIED">Replied</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={currentCategory} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
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
            <Select value={currentPriority} onValueChange={(value) => handleFilterChange("priority", value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="URGENT">Urgent</SelectItem>
              </SelectContent>
            </Select>
            <Select value={currentSource} onValueChange={(value) => handleFilterChange("source", value)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="CONTACT_FORM">Contact Form</SelectItem>
                <SelectItem value="EMAIL">Email</SelectItem>
                <SelectItem value="PHONE">Phone</SelectItem>
                <SelectItem value="CHAT">Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedMessages.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedMessages.length} message(s) selected
              </p>
              <div className="flex items-center space-x-2">
                <Select
                  value={bulkOperation.operation}
                  onValueChange={(value: string) => setBulkOperation(prev => ({ ...prev, operation: value as 'mark_read' | 'mark_replied' | 'archive' | 'delete' }))}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mark_read">Mark as Read</SelectItem>
                    <SelectItem value="mark_replied">Mark as Replied</SelectItem>
                    <SelectItem value="archive">Archive</SelectItem>
                    <SelectItem value="delete">Delete</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => setIsBulkDialogOpen(true)}
                  disabled={isPerformingOperation}
                >
                  Apply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMessages([])}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Messages ({pagination.total})</CardTitle>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedMessages.length === messages.length && messages.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-muted-foreground">Select All</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 text-center text-muted-foreground">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="mt-2">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No messages found</p>
                </div>
              ) : (
                <>
                  <div className="divide-y">
                    {messages.map((message) => {
                      const SourceIcon = sourceIcons[message.source];
                      return (
                        <div
                          key={message.id}
                          className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                            selectedMessage?.id === message.id ? "bg-muted" : ""
                          } ${message.status === "UNREAD" ? "border-l-4 border-l-blue-500" : ""}`}
                          onClick={() => handleMessageClick(message)}
                        >
                          <div className="flex items-start space-x-3">
                            <Checkbox
                              checked={selectedMessages.includes(message.id)}
                              onCheckedChange={(checked) => handleMessageSelection(message.id, checked as boolean)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>{getInitials(message.name)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <p className="font-medium truncate">{message.name}</p>
                                  {message.status === "UNREAD" && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Badge className={priorityColors[message.priority]}>
                                    {message.priority}
                                  </Badge>
                                  <Badge className={statusColors[message.status]}>
                                    {message.status}
                                  </Badge>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuItem onClick={() => handleStatusChange(message.id, "READ")}>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Mark as Read
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleStatusChange(message.id, "REPLIED")}>
                                        <ReplyIcon className="h-4 w-4 mr-2" />
                                        Mark as Replied
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleStatusChange(message.id, "ARCHIVED")}>
                                        <ArchiveIcon className="h-4 w-4 mr-2" />
                                        Archive
                                      </DropdownMenuItem>
                                      <DropdownMenuItem 
                                        onClick={() => {
                                          setMessageToDelete(message.id);
                                          setIsDeleteDialogOpen(true);
                                        }}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <p className="text-sm font-medium text-foreground mt-1 truncate">
                                {message.subject}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {message.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <SourceIcon className="h-3 w-3" />
                                    <span>{message.source.replace('_', ' ').toLowerCase()}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                                  </div>
                                  {message.tags.length > 0 && (
                                    <div className="flex items-center space-x-1">
                                      <Tag className="h-3 w-3" />
                                      <span>{message.tags[0]}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t">
                      <div className="text-sm text-muted-foreground">
                        Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={pagination.page <= 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                            const page = i + 1;
                            return (
                              <Button
                                key={page}
                                variant={pagination.page === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page)}
                              >
                                {page}
                              </Button>
                            );
                          })}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={pagination.page >= pagination.totalPages}
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Message Details */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Message Details</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedMessage.id, "READ")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedMessage.id, "REPLIED")}
                    >
                      <ReplyIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedMessage.id, "ARCHIVED")}
                    >
                      <ArchiveIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{getInitials(selectedMessage.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedMessage.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Subject</h4>
                  <p className="text-sm">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Message</h4>
                  <p className="text-sm whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Status</p>
                    <Badge className={statusColors[selectedMessage.status]}>
                      {selectedMessage.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">Priority</p>
                    <Badge className={priorityColors[selectedMessage.priority]}>
                      {selectedMessage.priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">Category</p>
                    <Badge className={categoryColors[selectedMessage.category]}>
                      {selectedMessage.category}
                    </Badge>
                  </div>
                  <div>
                    <p className="font-medium">Source</p>
                    <div className="flex items-center space-x-1">
                      {(() => {
                        const SourceIcon = sourceIcons[selectedMessage.source];
                        return <SourceIcon className="h-4 w-4" />;
                      })()}
                      <span className="capitalize">{selectedMessage.source.replace('_', ' ').toLowerCase()}</span>
                    </div>
                  </div>
                </div>

                {selectedMessage.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMessage.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </div>
                  {selectedMessage.readAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Read:</span>
                      <span>{new Date(selectedMessage.readAt).toLocaleString()}</span>
                    </div>
                  )}
                  {selectedMessage.repliedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Replied:</span>
                      <span>{new Date(selectedMessage.repliedAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1" asChild>
                    <Link href={`/management/messages/${selectedMessage.id}`}>
                      View Full Thread
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Bulk Operation Dialog */}
      <AlertDialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Bulk Operation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {bulkOperation.operation.replace('_', ' ')} {selectedMessages.length} message(s)?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleBulkOperation} disabled={isPerformingOperation}>
              {isPerformingOperation ? "Processing..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Message Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (messageToDelete) {
                  handleDeleteMessage(messageToDelete);
                  setMessageToDelete(null);
                }
                setIsDeleteDialogOpen(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 