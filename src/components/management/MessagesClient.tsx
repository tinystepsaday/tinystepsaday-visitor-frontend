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
  Trash2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  RefreshCw
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getMessages,
  getMessageStatistics,
  bulkUpdateMessages,
  bulkDeleteMessages,
  type ContactMessage,
  type MessageStatistics,
  type MessagesQueryParams,
  type BulkUpdateData,
  type BulkDeleteData
} from "@/integration/messages";

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
  const [stats, setStats] = useState<MessageStatistics | null>(null);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  // Get current filters from URL
  const currentSearch = searchParams.get('search') || '';
  const currentStatus = searchParams.get('status') || 'all';
  const currentCategory = searchParams.get('category') || 'all';
  const currentPriority = searchParams.get('priority') || 'all';
  const currentSource = searchParams.get('source') || 'all';
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentLimit = parseInt(searchParams.get('limit') || '10');

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      setIsLoading(true);
      const filters: MessagesQueryParams = {
        page: currentPage,
        limit: currentLimit
      };

      if (currentSearch) filters.search = currentSearch;
      if (currentStatus !== 'all') filters.status = currentStatus as MessagesQueryParams['status'];
      if (currentCategory !== 'all') filters.category = currentCategory as MessagesQueryParams['category'];
      if (currentPriority !== 'all') filters.priority = currentPriority as MessagesQueryParams['priority'];
      if (currentSource !== 'all') filters.source = currentSource as MessagesQueryParams['source'];

      const response = await getMessages(filters);

      if (response && response.success) {
        setMessages(response.data.messages);
        setTotalPages(response.data.totalPages);
        setTotalMessages(response.data.total);
      } else {
        toast.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    } finally {
      setIsLoading(false);
    }
  }, [currentSearch, currentStatus, currentCategory, currentPriority, currentSource, currentPage, currentLimit]);

  // Fetch stats
  const fetchStats = async () => {
    try {
      setIsLoadingStats(true);
      const response = await getMessageStatistics();

      if (response) {
        setStats(response);
      } else {
        toast.error('Failed to fetch stats');
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to fetch stats');
    } finally {
      setIsLoadingStats(false);
    }
  };

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

  // Bulk operations
  const handleBulkUpdate = async (updates: Partial<ContactMessage>) => {
    if (selectedMessages.size === 0) {
      toast.error('Please select messages to update');
      return;
    }

    try {
      setIsBulkUpdating(true);
      const bulkData: BulkUpdateData = {
        messageIds: Array.from(selectedMessages),
        updates
      };
      const response = await bulkUpdateMessages(bulkData);

      if (response.success) {
        toast.success(response.message);
        setSelectedMessages(new Set());
        fetchMessages();
        fetchStats();
      } else {
        toast.error('Failed to update messages');
      }
    } catch (error) {
      console.error('Error bulk updating messages:', error);
      toast.error('Failed to update messages');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMessages.size === 0) {
      toast.error('Please select messages to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedMessages.size} messages?`)) {
      return;
    }

    try {
      setIsBulkUpdating(true);
      const bulkData: BulkDeleteData = {
        messageIds: Array.from(selectedMessages)
      };
      const response = await bulkDeleteMessages(bulkData);

      if (response.success) {
        toast.success(response.message);
        setSelectedMessages(new Set());
        fetchMessages();
        fetchStats();
      } else {
        toast.error('Failed to delete messages');
      }
    } catch (error) {
      console.error('Error bulk deleting messages:', error);
      toast.error('Failed to delete messages');
    } finally {
      setIsBulkUpdating(false);
    }
  };

  // Handle message selection
  const handleMessageSelect = (messageId: string, checked: boolean) => {
    const newSelected = new Set(selectedMessages);
    if (checked) {
      newSelected.add(messageId);
    } else {
      newSelected.delete(messageId);
    }
    setSelectedMessages(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMessages(new Set(messages.map(m => m.id)));
    } else {
      setSelectedMessages(new Set());
    }
  };

  // Effects
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    fetchStats();
  }, []);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
  };

  const isAllSelected = messages.length > 0 && selectedMessages.size === messages.length;
  const isIndeterminate = selectedMessages.size > 0 && selectedMessages.size < messages.length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Messages</p>
                <p className="text-2xl font-bold">
                  {isLoadingStats ? <RefreshCw className="h-6 w-6 animate-spin" /> : stats?.total || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Unread</p>
                <p className="text-2xl font-bold text-blue-600">
                  {isLoadingStats ? <RefreshCw className="h-6 w-6 animate-spin" /> : stats?.unread || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <div>
                <p className="text-sm font-medium">Urgent</p>
                <p className="text-2xl font-bold text-red-600">
                  {isLoadingStats ? <RefreshCw className="h-6 w-6 animate-spin" /> : stats?.urgent || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="px-4">
            <div className="flex items-center space-x-2">
              <Reply className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Replied</p>
                <p className="text-2xl font-bold text-green-600">
                  {isLoadingStats ? <RefreshCw className="h-6 w-6 animate-spin" /> : stats?.replied || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Find and filter messages by various criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={currentSearch}
                  onChange={(e) => updateSearchParams({ search: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={currentStatus} onValueChange={(value) => updateSearchParams({ status: value })}>
              <SelectTrigger className="w-full">
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
            <Select value={currentCategory} onValueChange={(value) => updateSearchParams({ category: value })}>
              <SelectTrigger className="w-full">
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
            <Select value={currentPriority} onValueChange={(value) => updateSearchParams({ priority: value })}>
              <SelectTrigger className="w-full">
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
            <Select value={currentSource} onValueChange={(value) => updateSearchParams({ source: value })}>
              <SelectTrigger className="w-full">
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
            <Select value={currentLimit.toString()} onValueChange={(value) => updateSearchParams({ limit: value, page: '1' })}>
              <SelectTrigger className="w-full">
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
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedMessages.size > 0 && (
        <Card>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedMessages.size} message{selectedMessages.size !== 1 ? 's' : ''} selected
              </p>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" disabled={isBulkUpdating}>
                      <MoreHorizontal className="mr-2 h-4 w-4" />
                      Bulk Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleBulkUpdate({ status: 'READ' })}>
                      <Eye className="mr-2 h-4 w-4" />
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkUpdate({ status: 'REPLIED' })}>
                      <ReplyIcon className="mr-2 h-4 w-4" />
                      Mark as Replied
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleBulkUpdate({ status: 'ARCHIVED' })}>
                      <ArchiveIcon className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleBulkDelete}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedMessages(new Set())}
                >
                  Clear Selection
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
                <CardTitle>
                  Messages ({isLoading ? '...' : `${messages.length} of ${totalMessages}`})
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) (el as HTMLInputElement).indeterminate = isIndeterminate;
                    }}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-muted-foreground">Select All</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-6 text-center">
                  <RefreshCw className="h-8 w-8 mx-auto animate-spin" />
                  <p className="mt-2 text-muted-foreground">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No messages found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {messages.map((message) => {
                    const SourceIcon = sourceIcons[message.source];
                    return (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${selectedMessage?.id === message.id ? "bg-muted" : ""
                          } ${message.status === "UNREAD" ? "border-l-4 border-l-blue-500" : ""}`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={selectedMessages.has(message.id)}
                            onCheckedChange={(checked) => handleMessageSelect(message.id, checked as boolean)}
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
              )}
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <Card className="mt-4">
              <CardContent className="px-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col items-start gap-2 text-sm text-muted-foreground">
                    <span>
                      Showing {((currentPage - 1) * currentLimit) + 1} to {Math.min(currentPage * currentLimit, totalMessages)} of {totalMessages} messages
                    </span>
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

        {/* Message Details */}
        <div className="lg:col-span-1">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Message Details</CardTitle>
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
                  <div className="flex flex-col items-start gap-2">
                    <p className="font-medium">Status</p>
                    <Badge className={statusColors[selectedMessage.status]}>
                      {selectedMessage.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="font-medium">Priority</p>
                    <Badge className={priorityColors[selectedMessage.priority]}>
                      {selectedMessage.priority}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="font-medium">Category</p>
                    <Badge className={categoryColors[selectedMessage.category]}>
                      {selectedMessage.category}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-start gap-2">
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
    </div>
  );
} 