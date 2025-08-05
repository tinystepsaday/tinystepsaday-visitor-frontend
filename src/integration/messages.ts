import { getAuthToken } from "@/utils/tokenManager";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  category: "GENERAL" | "SUPPORT" | "MENTORSHIP" | "BILLING" | "TECHNICAL" | "FEEDBACK";
  source: "CONTACT_FORM" | "EMAIL" | "PHONE" | "CHAT";
  tags: string[];
  ipAddress?: string;
  userAgent?: string;
  assignedUser?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  replies: MessageReply[];
  readAt?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MessageReply {
  id: string;
  messageId: string;
  content: string;
  sentBy: "ADMIN" | "USER";
  sentByUser: string;
  attachments: string[];
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface MessageStatistics {
  total: number;
  unread: number;
  urgent: number;
  replied: number;
  byCategory: {
    GENERAL: number;
    SUPPORT: number;
    MENTORSHIP: number;
    BILLING: number;
    TECHNICAL: number;
    FEEDBACK: number;
  };
  byPriority: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    URGENT: number;
  };
  byStatus: {
    UNREAD: number;
    READ: number;
    REPLIED: number;
    ARCHIVED: number;
  };
}

export interface MessagesQueryParams {
  page?: number;
  limit?: number;
  status?: "UNREAD" | "READ" | "REPLIED" | "ARCHIVED" | "all";
  priority?: "LOW" | "MEDIUM" | "HIGH" | "URGENT" | "all";
  category?: "GENERAL" | "SUPPORT" | "MENTORSHIP" | "BILLING" | "TECHNICAL" | "FEEDBACK" | "all";
  source?: "CONTACT_FORM" | "EMAIL" | "PHONE" | "CHAT" | "all";
  search?: string;
  tags?: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "createdAt" | "updatedAt" | "priority" | "status";
  sortOrder?: "asc" | "desc";
}

export interface MessagesResponse {
  success: boolean;
  message: string;
  data: {
    messages: ContactMessage[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface MessageResponse {
  success: boolean;
  message: string;
  data: ContactMessage;
}

export interface StatisticsResponse {
  success: boolean;
  message: string;
  data: MessageStatistics;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface CreateContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category?: ContactMessage['category'];
  priority?: ContactMessage['priority'];
  source?: ContactMessage['source'];
  tags?: string[];
}

export interface UpdateMessageData {
  status?: ContactMessage['status'];
  priority?: ContactMessage['priority'];
  category?: ContactMessage['category'];
  assignedTo?: string;
  tags?: string[];
}

export interface BulkUpdateData {
  messageIds: string[];
  updates: UpdateMessageData;
}

export interface BulkDeleteData {
  messageIds: string[];
}

/**
 * Create a new contact message (public endpoint)
 */
export async function createContactMessage(data: CreateContactMessageData): Promise<ApiResponse<ContactMessage>> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to create contact message: ${response.statusText}`);
    }

    const result: ApiResponse<ContactMessage> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create contact message');
    }

    return result;
  } catch (error) {
    console.error('Error creating contact message:', error);
    throw error;
  }
}

/**
 * Fetch messages from the server with filtering, sorting, and pagination
 */
export async function getMessages(params: MessagesQueryParams = {}): Promise<MessagesResponse | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Build query string from params
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append('page', params.page.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.status) queryParams.append('status', params.status);
    if (params.priority) queryParams.append('priority', params.priority);
    if (params.category) queryParams.append('category', params.category);
    if (params.source) queryParams.append('source', params.source);
    if (params.search) queryParams.append('search', params.search);
    if (params.tags) queryParams.append('tags', params.tags);
    if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params.dateTo) queryParams.append('dateTo', params.dateTo);
    if (params.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }

    const result: MessagesResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch messages');
    }

    return result;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return null;
  }
}

/**
 * Fetch message by ID from the server
 */
export async function getMessageById(id: string): Promise<ContactMessage | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch message: ${response.statusText}`);
    }

    const result: MessageResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch message');
    }

    return result.data || null;
  } catch (error) {
    console.error('Error fetching message by ID:', error);
    return null;
  }
}

/**
 * Update message by ID
 */
export async function updateMessage(id: string, data: UpdateMessageData): Promise<ApiResponse<ContactMessage>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 404) {
        throw new Error('Message not found');
      }
      throw new Error(`Failed to update message: ${response.statusText}`);
    }

    const result: ApiResponse<ContactMessage> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to update message');
    }

    return result;
  } catch (error) {
    console.error('Error updating message:', error);
    throw error;
  }
}

/**
 * Delete message by ID
 */
export async function deleteMessage(id: string): Promise<ApiResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      if (response.status === 404) {
        throw new Error('Message not found');
      }
      throw new Error(`Failed to delete message: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to delete message');
    }

    return result;
  } catch (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
}

/**
 * Get message statistics
 */
export async function getMessageStatistics(params?: {
  dateFrom?: string;
  dateTo?: string;
}): Promise<MessageStatistics | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params?.dateTo) queryParams.append('dateTo', params.dateTo);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages/stats?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      throw new Error(`Failed to fetch message statistics: ${response.statusText}`);
    }

    const result: StatisticsResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch message statistics');
    }

    return result.data || null;
  } catch (error) {
    console.error('Error fetching message statistics:', error);
    return null;
  }
}

/**
 * Bulk update messages
 */
export async function bulkUpdateMessages(data: BulkUpdateData): Promise<ApiResponse<{
  operation: string;
  affectedCount: number;
  affectedMessageIds: string[];
}>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages/bulk/update`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      throw new Error(`Failed to perform bulk update: ${response.statusText}`);
    }

    const result: ApiResponse<{
      operation: string;
      affectedCount: number;
      affectedMessageIds: string[];
    }> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to perform bulk update');
    }

    return result;
  } catch (error) {
    console.error('Error performing bulk update:', error);
    throw error;
  }
}

/**
 * Bulk delete messages
 */
export async function bulkDeleteMessages(data: BulkDeleteData): Promise<ApiResponse<{
  operation: string;
  affectedCount: number;
  affectedMessageIds: string[];
}>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/messages/bulk/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Authentication failed');
      }
      throw new Error(`Failed to perform bulk delete: ${response.statusText}`);
    }

    const result: ApiResponse<{
      operation: string;
      affectedCount: number;
      affectedMessageIds: string[];
    }> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to perform bulk delete');
    }

    return result;
  } catch (error) {
    console.error('Error performing bulk delete:', error);
    throw error;
  }
}
