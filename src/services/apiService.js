
import { getAuthToken } from "./authService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create a reusable fetch function with authentication
export const fetchWithAuth = async (endpoint, options = {}) => {
  try {
    const token = await getAuthToken();
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// User API calls
export const userApi = {
  // Register user in MongoDB after Firebase auth
  registerUser: async (userData) => {
    return fetchWithAuth("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Get current user profile
  getProfile: async () => {
    return fetchWithAuth("/users/profile");
  },

  // Update user profile
  updateProfile: async (userData) => {
    return fetchWithAuth("/users/profile", {
      method: "PUT",
      body: JSON.stringify(userData),
    });
  },
};

// Product API calls
export const productApi = {
  // Get all products
  getAllProducts: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    return fetchWithAuth(`/products?${queryParams.toString()}`);
  },

  // Get product by ID
  getProductById: async (id) => {
    return fetchWithAuth(`/products/${id}`);
  },

  // Add product (admin only)
  addProduct: async (productData) => {
    return fetchWithAuth("/products/add", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  // Update product (admin only)
  updateProduct: async (id, productData) => {
    return fetchWithAuth(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    });
  },

  // Delete product (admin only)
  deleteProduct: async (id) => {
    return fetchWithAuth(`/products/${id}`, {
      method: "DELETE",
    });
  },
};

// Order API calls
export const orderApi = {
  // Create a new order
  createOrder: async (orderData) => {
    return fetchWithAuth("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  },

  // Get user orders
  getUserOrders: async () => {
    return fetchWithAuth("/orders/user/my-orders");
  },

  // Get order by ID
  getOrderById: async (id) => {
    return fetchWithAuth(`/orders/${id}`);
  },

  // Get all orders (admin only)
  getAllOrders: async () => {
    return fetchWithAuth("/orders");
  },

  // Update order status (admin only)
  updateOrderStatus: async (id, status) => {
    return fetchWithAuth(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },
};
