import axios from 'axios';
import { decrypt } from './crypto';

const apiClient = axios.create({
  baseURL: 'http://loyana.ir:7000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

const iranPlacesApiClient = axios.create({
  baseURL: 'https://iranplacesapi.liara.run/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to automatically add the auth token to requests
apiClient.interceptors.request.use((config) => {
  const encryptedToken = localStorage.getItem('access_token');
  if (encryptedToken) {
    const token = decrypt(encryptedToken);
    if (token) {
      // Set the Authorization header if the token exists and is decrypted
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor to handle 401 errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    // We check for window to ensure this only runs on the client-side
    if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
      // Don't redirect if we are already on the login page, as it's a failed login attempt.
      if (window.location.pathname !== '/login') {
        // Clear user data from storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('shopInfo');

        // Redirect to login page
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default {
  registerShop(userData: any) {
    return apiClient.post('/shops/', userData);
  },

  getProvinces() {
    return iranPlacesApiClient.get('/provinces');
  },

  getCities(provinceId: number) {
    return iranPlacesApiClient.get(`/provinces/id/${provinceId}/cities`);
  },

  login(userData: any) {
    const data = new URLSearchParams({
      grant_type: "password",
      username: userData.username,
      password: userData.password,
      scope: "",
      client_id: "string",
      client_secret: "string",
    });

    return apiClient.post("/authentication/login/", data, {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  // === Dashboard Workflow API Functions ===

  verifyPhone(phoneNumber: string) {
    return apiClient.get('/phones/verify/', {
      params: { phone_number: phoneNumber }
    });
  },

  registerCustomer(customerData: any) {
    return apiClient.post('/costumers/register', customerData);
  },

  createPurchase(purchaseData: any) {
    return apiClient.post('/purchases/', purchaseData);
  },

  getCustomerDiscount(customerId: number) {
    return apiClient.get(`/costumers/${customerId}/discount`);
  },

  downloadReports() {
    return apiClient.get('/reports/', {
      responseType: 'blob', // Important for handling file downloads
    });
  },

  logout() {
    return apiClient.post('/authentication/logout/');
  },

  getShop() {
    return apiClient.get('/shops/');
  },

  updateShop(shopData: any) {
    return apiClient.put('/shops/', shopData);
  },

  forgotPassword(identifier: string) {
    return apiClient.post('/authentication/forgot-password', { identifier });
  },

  resetPassword(data: { token: string; new_password: string }) {
    return apiClient.post('/authentication/reset-password', data);
  },
};
