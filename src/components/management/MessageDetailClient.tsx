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
import { getMessageReplies, getTemplates, type ContactMessage, type MessageReply, type MessageTemplate } from "@/lib/api/messages";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

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

interface MessageDetailClientProps {
  message: ContactMessage;
}

export function MessageDetailClient({ message }: MessageDetailClientProps) {
  const router = useRouter();
  const [replyContent, setReplyContent] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [isReplying, setIsReplying] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const [replies, setReplies] = useState<MessageReply[]>([]);
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);

  // Fetch replies and templates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [repliesResponse, templatesResponse] = await Promise.all([
          getMessageReplies(message.id),
          getTemplates()
        ]);
        
        if (repliesResponse.success) {
          setReplies(repliesResponse.data);
        }
        
        if (templatesResponse.success) {
          setTemplates(templatesResponse.data.templates);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [message.id]);

  const getInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const handleStatusChange = (newStatus: ContactMessage['status']) => {
    // In a real app, this would update the message status via API
    console.log(`Updating message ${message.id} status to ${newStatus}`);
    toast.success(`Message marked as ${newStatus}`);
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setReplyContent(template.content.replace('{{name}}', message.name));
      setSelectedTemplate(templateId);
    }
  };

  const handleSendReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    setIsReplying(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Sending reply:", replyContent);
    toast.success("Reply sent successfully!");

    setReplyContent("");
    setShowReplyForm(false);
    setIsReplying(false);
  };

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
              onClick={() => handleStatusChange("read")}
            >
              <Eye className="mr-2 h-4 w-4" />
              Mark Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange("archived")}
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
                    <span className="capitalize">{message.source}</span>
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
                  {message.priority === "urgent" && (
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
          {replies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Replies ({replies.length})</h3>
              {replies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {reply.sentBy === "admin" ? "AD" : getInitials(message.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">
                              {reply.sentBy === "admin" ? "Admin" : message.name}
                            </p>
                            <Badge variant={reply.sentBy === "admin" ? "default" : "outline"}>
                              {reply.sentBy === "admin" ? "Staff" : "Customer"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(reply.sentAt), { addSuffix: true })}
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