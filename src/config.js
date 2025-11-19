// API Configuration
export const API_BASE_URL = 'https://medical-consultation-backend-1.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    PROFILE: '/api/auth/profile',
  },
  APPOINTMENTS: {
    BASE: '/api/appointments',
    BY_ID: (id) => `/api/appointments/${id}`,
  },
  DOCTORS: {
    BASE: '/api/doctors',
    BY_ID: (id) => `/api/doctors/${id}`,
  },
  // Add other endpoints as needed
};

// Environment configuration
export const ENV = {
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
};
