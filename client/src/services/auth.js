import api from './api';

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { // Endpoint correcto
      email,
      password
    });
    return response.data;
  } catch (error) {
    // Extrae los mensajes de error del backend
    if (error.response?.data?.errors) {
      const errorMessages = error.response.data.errors.map(err => err.msg);
      throw new Error(errorMessages.join('\n'));
    }
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión');
  }
};

export const verifyToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // Opcional: Verificar token con backend
    // await api.get('/verify-token');
    
    return JSON.parse(atob(token.split('.')[1])); // Decodificar payload
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};