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

export default {
  registerUser(userData: any) {
    return apiClient.post('/users/', userData);
  },

  getProvinces() {
    return iranPlacesApiClient.get('/provinces');
  },

  getCities(provinceId: number) {
    return iranPlacesApiClient.get(`/provinces/${provinceId}/cities`);
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
  }
};
