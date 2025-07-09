"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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
  Archive as ArchiveIcon
} from "lucide-react";
import { getMessages, searchMessages, type ContactMessage } from "@/data/messages";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-blue-100 text-blue-800",
  high: "bg-orange-100 text-orange-800",
  urgent: "bg-red-100 text-red-800"
};

const statusColors = {
  unread: "bg-blue-100 text-blue-800",
  read: "bg-gray-100 text-gray-800",
  replied: "bg-green-100 text-green-800",
  archived: "bg-yellow-100 text-yellow-800"
};

const categoryColors = {
  general: "bg-purple-100 text-purple-800",
  support: "bg-blue-100 text-blue-800",
  mentorship: "bg-green-100 text-green-800",
  billing: "bg-orange-100 text-orange-800",
  technical: "bg-red-100 text-red-800",
  feedback: "bg-pink-100 text-pink-800"
};

const sourceIcons = {
  "contact-form": Mail,
  email: Mail,
  phone: Phone,
  chat: MessageSquare
};

export function MessagesClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const allMessages = getMessages();

  const filteredMessages = useMemo(() => {
    let filtered = allMessages;

    // Apply search filter
    if (searchQuery) {
      filtered = searchMessages(searchQuery);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(message => message.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(message => message.category === categoryFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(message => message.priority === priorityFilter);
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [allMessages, searchQuery, statusFilter, categoryFilter, priorityFilter]);

  const stats = useMemo(() => {
    const total = allMessages.length;
    const unread = allMessages.filter(m => m.status === "unread").length;
    const urgent = allMessages.filter(m => m.priority === "urgent").length;
    const replied = allMessages.filter(m => m.status === "replied").length;

    return { total, unread, urgent, replied };
  }, [allMessages]);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleMessageClick = (message: ContactMessage) => {
    setSelectedMessage(message);
  };

  const handleStatusChange = (messageId: string, newStatus: ContactMessage['status']) => {
    // In a real app, this would update the message status via API
    console.log(`Updating message ${messageId} status to ${newStatus}`);
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
                <p className="text-2xl font-bold">{stats.total}</p>
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
                <p className="text-2xl font-bold text-blue-600">{stats.unread}</p>
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
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
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
                <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="mentorship">Mentorship</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Messages ({filteredMessages.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredMessages.length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground">
                    <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No messages found</p>
                  </div>
                ) : (
                  filteredMessages.map((message) => {
                    const SourceIcon = sourceIcons[message.source];
                    return (
                      <div
                        key={message.id}
                        className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                          selectedMessage?.id === message.id ? "bg-muted" : ""
                        } ${message.status === "unread" ? "border-l-4 border-l-blue-500" : ""}`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>{getInitials(message.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium truncate">{message.name}</p>
                                {message.status === "unread" && (
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
                                  <span>{message.source}</span>
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
                  })
                )}
              </div>
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
                      onClick={() => handleStatusChange(selectedMessage.id, "read")}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedMessage.id, "replied")}
                    >
                      <ReplyIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStatusChange(selectedMessage.id, "archived")}
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
                      <span className="capitalize">{selectedMessage.source}</span>
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