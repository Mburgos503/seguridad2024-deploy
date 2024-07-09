import axios from 'axios';

// Crear una instancia de Axios con la URL base de las variables de entorno
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default apiClient;
