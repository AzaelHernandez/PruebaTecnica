import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Todas las peticiones llevarán /api al inicio
  withCredentials: true // Para manejar cookies si las usas
});

// Interceptor para añadir token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;