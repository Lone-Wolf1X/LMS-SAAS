import axios from 'axios';

// Central API (HQ) - Runs on port 3000
export const centralApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CENTRAL_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Client Node API (LMS/SIS) - Runs on port 3001
export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CLIENT_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors here if needed (e.g. for attaching auth tokens or handling 401s)
clientApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Client API Error:', error);
    return Promise.reject(error);
  }
);
