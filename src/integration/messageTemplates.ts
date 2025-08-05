import { getAuthToken } from "@/utils/tokenManager";

export interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: "GENERAL" | "SUPPORT" | "MENTORSHIP" | "BILLING" | "TECHNICAL" | "FEEDBACK";
  isDefault: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  createdByUser: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface TemplatesQueryParams {
  category?: "GENERAL" | "SUPPORT" | "MENTORSHIP" | "BILLING" | "TECHNICAL" | "FEEDBACK" | "all";
}

export interface TemplatesResponse {
  success: boolean;
  message: string;
  data: MessageTemplate[];
}

export interface TemplateResponse {
  success: boolean;
  message: string;
  data: MessageTemplate;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface CreateTemplateData {
  name: string;
  subject: string;
  content: string;
  category: MessageTemplate['category'];
  isDefault?: boolean;
}

export interface UpdateTemplateData {
  name?: string;
  subject?: string;
  content?: string;
  category?: MessageTemplate['category'];
  isDefault?: boolean;
}

/**
 * Create a new message template
 */
export async function createTemplate(data: CreateTemplateData): Promise<ApiResponse<MessageTemplate>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/templates`, {
      method: 'POST',
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
      throw new Error(`Failed to create template: ${response.statusText}`);
    }

    const result: ApiResponse<MessageTemplate> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create template');
    }

    return result;
  } catch (error) {
    console.error('Error creating template:', error);
    throw error;
  }
}

/**
 * Fetch templates from the server
 */
export async function getTemplates(params: TemplatesQueryParams = {}): Promise<MessageTemplate[] | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    // Build query string from params
    const queryParams = new URLSearchParams();
    if (params.category) queryParams.append('category', params.category);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/messages/templates?${queryParams.toString()}`;

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
      throw new Error(`Failed to fetch templates: ${response.statusText}`);
    }

    const result: TemplatesResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch templates');
    }

    return result.data || null;
  } catch (error) {
    console.error('Error fetching templates:', error);
    return null;
  }
}

/**
 * Fetch template by ID from the server
 */
export async function getTemplateById(id: string): Promise<MessageTemplate | null> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/templates/${id}`, {
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
      throw new Error(`Failed to fetch template: ${response.statusText}`);
    }

    const result: TemplateResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch template');
    }

    return result.data || null;
  } catch (error) {
    console.error('Error fetching template by ID:', error);
    return null;
  }
}

/**
 * Update template by ID
 */
export async function updateTemplate(id: string, data: UpdateTemplateData): Promise<ApiResponse<MessageTemplate>> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/templates/${id}`, {
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
        throw new Error('Template not found');
      }
      throw new Error(`Failed to update template: ${response.statusText}`);
    }

    const result: ApiResponse<MessageTemplate> = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to update template');
    }

    return result;
  } catch (error) {
    console.error('Error updating template:', error);
    throw error;
  }
}

/**
 * Delete template by ID
 */
export async function deleteTemplate(id: string): Promise<ApiResponse> {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/templates/${id}`, {
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
        throw new Error('Template not found');
      }
      throw new Error(`Failed to delete template: ${response.statusText}`);
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to delete template');
    }

    return result;
  } catch (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
}
