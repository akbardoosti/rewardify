import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://188.165.24.192:7000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  registerUser(userData: any) {
    return apiClient.post('/users/', userData);
  }
};
