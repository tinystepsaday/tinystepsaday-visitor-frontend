"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Reply,
  Archive,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Clock,
  AlertCircle,
  Eye
} from "lucide-react";
import { 
  getMessageById, 
  updateMessage, 
  createMessageReply,
  type ContactMessage,
} from "@/integration/messages";
import { 
  getTemplates, 
  type MessageTemplate 
} from "@/integration/messageTemplates";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

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

interface MessageDetailClientProps {
  messageId: string;
}

export function MessageDetailClient({ messageId }: MessageDetailClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState<ContactMessage | null>(null);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [replyContent, setReplyContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isReplying, setIsReplying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Fetch message and templates
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [messageData, templatesData] = await Promise.all([
          getMessageById(messageId),
          getTemplates()
        ]);
        
        if (messageData) {
          setMessage(messageData);
        } else {
          toast.error("Message not found");
          router.push("/management/messages");
        }
        
        if (templatesData) {
          setTemplates(templatesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load message details");
        router.push("/management/messages");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [messageId, router]);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleStatusChange = async (newStatus: ContactMessage['status']) => {
    if (!message) return;

    try {
      const result = await updateMessage(message.id, { status: newStatus });
      if (result.success) {
        setMessage(prev => prev ? { ...prev, status: newStatus } : null);
        toast.success(`Message marked as ${newStatus.toLowerCase()}`);
      }
    } catch (error) {
      console.error("Error updating message status:", error);
      toast.error("Failed to update message status");
    }
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template && message) {
      // Replace template placeholders with actual values
      let content = template.content;
      content = content.replace(/\{\{name\}\}/g, message.name);
      content = content.replace(/\{\{email\}\}/g, message.email);
      content = content.replace(/\{\{subject\}\}/g, message.subject);
      
      setReplyContent(content);
      setSelectedTemplate(templateId);
    }
  };

  const handleSendReply = async () => {
    if (!replyContent.trim() || !message) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsReplying(true);

    try {
      // Send the actual reply via API
      const result = await createMessageReply(message.id, {
        content: replyContent
      });
      
      if (result.success && result.data) {
        // Refresh the message data to get the latest state
        const updatedMessage = await getMessageById(messageId);
        if (updatedMessage) {
          setMessage(updatedMessage);
        }
        
        toast.success("Reply sent successfully!");
        setReplyContent("");
        setShowReplyForm(false);
        setSelectedTemplate("");
      } else {
        toast.error(result.message || "Failed to send reply");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send reply");
    } finally {
      setIsReplying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2">Loading message details...</span>
      </div>
    );
  }

  if (!message) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Message not found</p>
        <Button onClick={() => router.push("/management/messages")} className="mt-4">
          Back to Messages
        </Button>
      </div>
    );
  }

  const SourceIcon = sourceIcons[message.source];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full flex-col">
        <div className="flex items-center w-full justify-between mb-4">
          <div className="flex items-center w-full justify-between">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("READ")}
            >
              <Eye className="mr-2 h-4 w-4" />
              Mark Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("ARCHIVED")}
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
            >
              <Reply className="mr-2 h-4 w-4" />
              Reply
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-start w-full">
          <h1 className="text-2xl font-bold">Message Thread</h1>
          <p className="text-muted-foreground">View and respond to messages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Message Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback>{getInitials(message.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{message.name}</p>
                  <p className="text-sm text-muted-foreground">{message.email}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Subject</h4>
                <p className="text-sm">{message.subject}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Status</p>
                  <Badge className={statusColors[message.status]}>
                    {message.status}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Priority</p>
                  <Badge className={priorityColors[message.priority]}>
                    {message.priority}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Category</p>
                  <Badge className={categoryColors[message.category]}>
                    {message.category}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium">Source</p>
                  <div className="flex items-center space-x-1">
                    <SourceIcon className="h-4 w-4" />
                    <span className="capitalize">{message.source.replace('_', ' ').toLowerCase()}</span>
                  </div>
                </div>
              </div>

              {message.tags.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {message.tags.map((tag, index) => (
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
                  <span>{new Date(message.createdAt).toLocaleString()}</span>
                </div>
                {message.readAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Read:</span>
                    <span>{new Date(message.readAt).toLocaleString()}</span>
                  </div>
                )}
                {message.repliedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Replied:</span>
                    <span>{new Date(message.repliedAt).toLocaleString()}</span>
                  </div>
                )}
                {message.ipAddress && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IP Address:</span>
                    <span className="font-mono text-xs">{message.ipAddress}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Thread */}
        <div className="lg:col-span-2 space-y-6">
          {/* Original Message */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Original Message</CardTitle>
                <div className="flex items-center space-x-2">
                  {message.priority === "URGENT" && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge className={priorityColors[message.priority]}>
                    {message.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{getInitials(message.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{message.name}</p>
                        <p className="text-sm text-muted-foreground">{message.email}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          {message.replies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Replies ({message.replies.length})</h3>
              {message.replies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {reply.sentBy === "ADMIN" 
                            ? (reply.user ? getInitials(`${reply.user.firstName} ${reply.user.lastName}`) : "AD")
                            : getInitials(message.name)
                          }
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">
                              {reply.sentBy === "ADMIN" 
                                ? (reply.user ? `${reply.user.firstName} ${reply.user.lastName}` : "Admin")
                                : message.name
                              }
                            </p>
                            <Badge variant={reply.sentBy === "ADMIN" ? "default" : "outline"}>
                              {reply.sentBy === "ADMIN" ? "Staff" : "Customer"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm whitespace-pre-wrap">{reply.content}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Reply Form */}
          {showReplyForm && (
            <Card>
              <CardHeader>
                <CardTitle>Send Reply</CardTitle>
                <CardDescription>Respond to this message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Quick Templates</label>
                  <Select value={selectedTemplate} onValueChange={handleTemplateSelect}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a template (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Reply Message</label>
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowReplyForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    disabled={isReplying || !replyContent.trim()}
                  >
                    {isReplying ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Reply
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 