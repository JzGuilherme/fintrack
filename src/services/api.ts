import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fintrack:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // só redireciona se tiver token salvo (usuário realmente autenticado)
    if (error.response?.status === 401) {
      const user = localStorage.getItem('fintrack:user');
      if (user) {
        localStorage.removeItem('fintrack:user');
        localStorage.removeItem('fintrack:token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;