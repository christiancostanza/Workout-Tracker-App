import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://workout-tracker-app-backend-28fg.onrender.com/api' : 'http://localhost:10000/api');

const api = axios.create({
  baseURL: API_URL,
});

// Add token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authService = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Workout endpoints
export const workoutService = {
  getWorkouts: () => api.get('/workouts'),
  getWorkout: (id) => api.get(`/workouts/${id}`),
  createWorkout: (workoutData) =>
    api.post('/workouts', workoutData),
  updateWorkout: (id, workoutData) =>
    api.put(`/workouts/${id}`, workoutData),
  deleteWorkout: (id) =>
    api.delete(`/workouts/${id}`),
};

export default api;
