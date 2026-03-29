import axios from 'axios';

// The frontend can switch environments without changing component code.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
});

export default api;
