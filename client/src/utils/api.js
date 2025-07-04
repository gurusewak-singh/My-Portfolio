import axios from 'axios';

// A_Create a centralized Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api',
  // A_ REMOVED the global 'Content-Type' header.
  // Axios will now correctly set 'application/json' for regular objects
  // and 'multipart/form-data' when you send a FormData object.
});

// A_This interceptor correctly adds the auth token and is crucial.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;