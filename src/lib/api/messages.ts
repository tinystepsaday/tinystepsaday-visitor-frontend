import apiClient from '@/integration/apiClient';

// Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'general' | 'support' | 'mentorship' | 'billing' | 'technical' | 'feedback';
  source: 'contact-form' | 'email' | 'phone' | 'chat';
  tags: string[];
  createdAt: string;
  readAt?: string;
  repliedAt?: string;
  ipAddress?: string;
  assignedTo?: string;
}

export interface MessageReply {
  id: string;
  messageId: string;
  content: string;
  sentBy: 'admin' | 'user';
  sentAt: string;
  sentByUser?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessageStats {
  total: number;
  unread: number;
  urgent: number;
  replied: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface MessagesResponse {
  success: boolean;
  message: string;
  data: {
    messages: ContactMessage[];
    total: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface MessageFilters {
  search?: string;
  status?: string;
  category?: string;
  priority?: string;
  source?: string;
  page?: number;
  limit?: number;
}

// Messages API
export async function getMessages(filters: MessageFilters = {}): Promise<MessagesResponse> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== 'all') {
      params.append(key, value.toString());
    }
  });

  return apiClient.get(`/api/messages/messages?${params.toString()}`);
}

export async function getMessageById(id: string): Promise<{ success: boolean; data: ContactMessage }> {
  return apiClient.get(`/api/messages/messages/${id}`);
}

export async function updateMessage(id: string, updates: Partial<ContactMessage>): Promise<{ success: boolean; message: string }> {
  return apiClient.put(`/api/messages/messages/${id}`, updates);
}

export async function deleteMessage(id: string): Promise<{ success: boolean; message: string }> {
  return apiClient.delete(`/api/messages/messages/${id}`);
}

export async function bulkUpdateMessages(messageIds: string[], updates: Partial<ContactMessage>): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/messages/messages/bulk/update', {
    messageIds,
    updates
  });
}

export async function bulkDeleteMessages(messageIds: string[]): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/messages/messages/bulk/delete', {
    messageIds
  });
}

export async function getMessageStats(dateFrom?: string, dateTo?: string): Promise<{ success: boolean; data: MessageStats }> {
  const params = new URLSearchParams();
  if (dateFrom) params.append('dateFrom', dateFrom);
  if (dateTo) params.append('dateTo', dateTo);
  
  return apiClient.get(`/api/messages/messages/stats?${params.toString()}`);
}

// Message Replies API
export async function getMessageReplies(messageId: string): Promise<{ success: boolean; data: MessageReply[] }> {
  return apiClient.get(`/api/messages/messages/${messageId}/replies`);
}

export async function sendReply(messageId: string, content: string): Promise<{ success: boolean; message: string }> {
  return apiClient.post(`/api/messages/messages/${messageId}/replies`, {
    content
  });
}

// Templates API
export async function getTemplates(filters: { search?: string; category?: string; page?: number; limit?: number } = {}): Promise<{ success: boolean; data: { templates: MessageTemplate[]; total: number; totalPages: number; currentPage: number } }> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== 'all') {
      params.append(key, value.toString());
    }
  });

  return apiClient.get(`/api/messages/templates?${params.toString()}`);
}

export async function getTemplateById(id: string): Promise<{ success: boolean; data: MessageTemplate }> {
  return apiClient.get(`/api/messages/templates/${id}`);
}

export async function createTemplate(template: Omit<MessageTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<{ success: boolean; data: MessageTemplate }> {
  return apiClient.post('/api/messages/templates', template);
}

export async function updateTemplate(id: string, updates: Partial<MessageTemplate>): Promise<{ success: boolean; data: MessageTemplate }> {
  return apiClient.put(`/api/messages/templates/${id}`, updates);
}

export async function deleteTemplate(id: string): Promise<{ success: boolean; message: string }> {
  return apiClient.delete(`/api/messages/templates/${id}`);
}

// Contact Form API
export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: string;
  priority?: string;
}): Promise<{ success: boolean; message: string }> {
  return apiClient.post('/api/messages/contact', data);
} 