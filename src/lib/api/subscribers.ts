import { getAuthToken } from "@/utils/tokenManager";

export interface Subscriber {
  id: string;
  email: string;
  subscribingTo: "FOOTER" | "MODAL" | "BOOK_PUBLISH";
  item?: {
    name: string;
    id: string;
  };
  isActive: boolean;
  ipAddress?: string;
  userAgent?: string;
  unsubscribedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribersResponse {
  success: boolean;
  message: string;
  data: {
    subscribers: Subscriber[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SubscriberStats {
  total: number;
  active: number;
  inactive: number;
  byType: {
    FOOTER: number;
    MODAL: number;
    BOOK_PUBLISH: number;
  };
  recentSubscriptions: number;
}

export interface SubscribersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  subscribingTo?: "FOOTER" | "MODAL" | "BOOK_PUBLISH" | "all";
  isActive?: boolean | "all";
  dateRange?: "all" | "today" | "week" | "month" | "quarter" | "year";
  startDate?: string;
  endDate?: string;
  sortBy?: "createdAt" | "updatedAt" | "email" | "subscribingTo";
  sortOrder?: "asc" | "desc";
}

export interface CreateSubscriberData {
  email: string;
  subscribingTo: "FOOTER" | "MODAL" | "BOOK_PUBLISH";
  item?: {
    name: string;
    id: string;
  };
}

export interface UpdateSubscriberData {
  email?: string;
  subscribingTo?: "FOOTER" | "MODAL" | "BOOK_PUBLISH";
  item?: {
    name: string;
    id: string;
  };
  isActive?: boolean;
}

export interface UnsubscribeData {
  email: string;
  subscribingTo?: "FOOTER" | "MODAL" | "BOOK_PUBLISH";
  unsubscribeReason?: "TOO_MANY_EMAILS" | "NOT_RELEVANT" | "SPAM" | "PRIVACY_CONCERNS" | "NO_LONGER_INTERESTED" | "OTHER";
}

export interface BulkSubscriberOperationData {
  subscriberIds: string[];
  operation: "activate" | "deactivate" | "delete";
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api" || "http://localhost:3001/api";

/**
 * Subscribe to newsletter (public endpoint)
 */
export async function subscribeToNewsletter(data: CreateSubscriberData): Promise<ApiResponse<Subscriber>> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw new Error("Failed to subscribe to newsletter");
  }
}

/**
 * Unsubscribe from newsletter (public endpoint)
 */
export async function unsubscribeFromNewsletter(data: UnsubscribeData): Promise<ApiResponse<Subscriber>> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers/unsubscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error unsubscribing from newsletter:", error);
    throw new Error("Failed to unsubscribe from newsletter");
  }
}

/**
 * Check subscription status (public endpoint)
 */
export async function checkSubscriptionStatus(email: string): Promise<ApiResponse<{
  isSubscribed: boolean;
  email: string;
  subscribingTo?: string;
  isActive?: boolean;
  subscribedAt?: string;
}>> {
  try {
    const response = await fetch(`${API_BASE_URL}/subscribers/check/${encodeURIComponent(email)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    throw new Error("Failed to check subscription status");
  }
}

/**
 * Fetch subscribers from the server with filtering, sorting, and pagination (admin only)
 */
export async function getSubscribers(params: SubscribersQueryParams = {}): Promise<SubscribersResponse | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.subscribingTo) queryParams.append("subscribingTo", params.subscribingTo);
    if (params.isActive !== undefined) queryParams.append("isActive", params.isActive.toString());
    if (params.dateRange) queryParams.append("dateRange", params.dateRange);
    if (params.startDate) queryParams.append("startDate", params.startDate);
    if (params.endDate) queryParams.append("endDate", params.endDate);
    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
    if (params.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    const response = await fetch(`${API_BASE_URL}/subscribers?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return null;
  }
}

/**
 * Get subscriber statistics (admin only)
 */
export async function getSubscriberStats(): Promise<SubscriberStats | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/subscribers/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching subscriber stats:", error);
    return null;
  }
}

/**
 * Bulk operations on subscribers (admin only)
 */
export async function bulkSubscriberOperations(data: BulkSubscriberOperationData): Promise<ApiResponse<{
  success: number;
  failed: number;
  errors: string[];
}>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${API_BASE_URL}/subscribers/bulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error performing bulk operations:", error);
    throw new Error("Failed to perform bulk operations");
  }
} 