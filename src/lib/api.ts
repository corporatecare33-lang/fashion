import axios from 'axios';

// Backend API base URL — uses VITE_API_URL env variable (set in .env or .env.production)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Types
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string;
  sale_price?: string;
  image: string;
  images?: string[];
  sku: string;
  stock: number;
  category_id: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  featured: boolean;
  on_sale: boolean;
  status: string;
  sales_count: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  product_count?: number;
}

export interface PaginatedProducts {
  data: Product[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface OrderItem {
  product_id: number;
  quantity: number;
}

export interface CreateOrderData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code?: string;
  payment_method: string;
  notes?: string;
  shipping_cost: number;
  items: OrderItem[];
}

export interface Order {
  id: number;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  city: string;
  postal_code?: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment_status: 'pending' | 'paid' | 'failed';
  payment_method?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItemDetail[];
}

export interface OrderItemDetail {
  id: number;
  product_id: number;
  product_name: string;
  product_sku?: string;
  price: number;
  quantity: number;
  subtotal: number;
  product?: any;
}

export interface PaginatedOrders {
  data: Order[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

// Product API functions
export const getProducts = async (params?: {
  per_page?: number;
  search?: string;
  category_id?: number;
}): Promise<PaginatedProducts> => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProduct = async (slug: string): Promise<Product> => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories');
  return response.data;
};

// Add methods to api object for convenience
api.getProducts = (params?: any) => api.get('/products', { params }).then(r => r.data);
api.getCategories = () => api.get('/categories').then(r => r.data);

// Order API Functions
export const orderApi = {
  // Get all orders (paginated)
  getAll: async (page = 1): Promise<PaginatedOrders> => {
    const response = await api.get(`/orders?page=${page}`);
    return response.data;
  },

  // Get single order by order number
  getByOrderNumber: async (orderNumber: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderNumber}`);
    return response.data;
  },

  // Create new order
  create: async (data: CreateOrderData): Promise<{ message: string; order: Order }> => {
    const response = await api.post('/orders', data);
    return response.data;
  },
};

// Admin API Functions (for admin panel)
export const adminOrderApi = {
  // Update order status
  updateStatus: async (orderId: number, status: string, paymentStatus: string): Promise<Order> => {
    const response = await api.put(`/admin/orders/${orderId}`, {
      status,
      payment_status: paymentStatus,
    });
    return response.data;
  },

  // Delete order
  delete: async (orderId: number): Promise<void> => {
    await api.delete(`/admin/orders/${orderId}`);
  },
};

export { api };
export default api;