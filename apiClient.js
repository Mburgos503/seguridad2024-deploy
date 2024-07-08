import axios from 'axios';

const baseURL = 'https://proyectoncapas.studio:8080';

const apiClient = axios.create({
  baseURL: baseURL, 
});

// Interceptor para agregar el token a las solicitudes
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const makeApiRequest = async (url, method = 'GET', data = null) => {
  try {
    const response = await apiClient({
      method: method,
      url: url,
      data: data
    });
    return response.data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error;
  }
};

export default apiClient;