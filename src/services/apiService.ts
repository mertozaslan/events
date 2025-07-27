// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Generic API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value);
        }
      });
    }

    return this.request<T>(url.pathname + url.search);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// API Client instance
const apiClient = new ApiClient(API_BASE_URL);

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: any;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
}

// Events API
export const eventsApi = {
  // Get all events with filters
  getAll: async (params?: {
    search?: string;
    category?: string;
    sort?: string;
    limit?: number;
    type?: 'upcoming' | 'popular' | 'all';
  }) => {
    const searchParams: Record<string, string> = {};
    
    if (params?.search) searchParams.search = params.search;
    if (params?.category) searchParams.category = params.category;
    if (params?.sort) searchParams.sort = params.sort;
    if (params?.limit) searchParams.limit = params.limit.toString();
    if (params?.type) searchParams.type = params.type;

    return apiClient.get<ApiResponse<any[]>>('/api/events', searchParams);
  },

  // Get single event by ID
  getById: async (id: string) => {
    return apiClient.get<ApiResponse<any>>(`/api/events/${id}`);
  },

  // Create new event
  create: async (eventData: any) => {
    return apiClient.post<ApiResponse<any>>('/api/events', eventData);
  },

  // Update event
  update: async (id: string, eventData: any) => {
    return apiClient.put<ApiResponse<any>>(`/api/events/${id}`, eventData);
  },

  // Delete event
  delete: async (id: string) => {
    return apiClient.delete<ApiResponse<any>>(`/api/events/${id}`);
  },
};

// Profile API
export const profileApi = {
  // Get user profile
  get: async () => {
    return apiClient.get<ApiResponse<any>>('/api/profile');
  },

  // Update user profile
  update: async (profileData: any) => {
    return apiClient.put<ApiResponse<any>>('/api/profile', profileData);
  },
};

// Categories API
export const categoriesApi = {
  // Get all categories
  getAll: async () => {
    return apiClient.get<ApiResponse<any[]>>('/api/categories');
  },
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'Bilinmeyen bir hata oluştu';
};

// Loading state utility
export const createLoadingState = () => {
  let loading = false;
  let error: string | null = null;

  const setLoading = (value: boolean) => {
    loading = value;
  };

  const setError = (value: string | null) => {
    error = value;
  };

  return {
    loading,
    error,
    setLoading,
    setError,
  };
}; 