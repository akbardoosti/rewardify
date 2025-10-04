import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://188.165.24.192:7000/api/v1',
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
apiClient.interceptors.request.use(config => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('access_token');
  if (token) {
    // Set the Authorization header if the token exists
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

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
    return apiClient.post('/purchase/', purchaseData);
  },

  getCustomerDiscount(customerId: number) {
    return apiClient.get(`/costumers/${customerId}/discount`);
  },

  downloadReports() {
    return apiClient.get('/reports/', {
      responseType: 'blob', // Important for handling file downloads
    });
  },
};
