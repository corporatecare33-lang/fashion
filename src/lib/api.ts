import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Types
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

// API Functions
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

export default api;
