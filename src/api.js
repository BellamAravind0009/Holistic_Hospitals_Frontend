import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/";

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Function to check if token is about to expire (within 60 seconds)
const isTokenExpiringSoon = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    // Return true if token expires in less than 60 seconds
    return decoded.exp - currentTime < 60;
  } catch (error) {
    return true; // If we can't decode the token, assume it's expiring
  }
};

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");
    
    const response = await axios.post(`${API_BASE_URL}token/refresh/`, {
      refresh: refreshToken
    });
    
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refreshToken", response.data.refresh);
    return response.data.access;
  } catch (error) {
    // If refresh fails, clear storage and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    window.location.href = "/login";
    throw error;
  }
};

// Add request interceptor to include auth token for all requests
API.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    
    // If token exists and is expiring soon, refresh it
    if (token && isTokenExpiringSoon(token)) {
      try {
        token = await refreshAccessToken();
      } catch (error) {
        // If refresh fails, the refreshAccessToken function will handle redirection
        return Promise.reject(error);
      }
    }
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const token = await refreshAccessToken();
        // Update the header and retry the request
        originalRequest.headers["Authorization"] = `Bearer ${token}`;
        return API(originalRequest);
      } catch (refreshError) {
        // refreshAccessToken already handles redirection on failure
        return Promise.reject(refreshError);
      }
    }
    
    // Handle rate limiting (429 errors)
    if (error.response && error.response.status === 429) {
      // Display user-friendly message about rate limiting
      alert("You've reached the request limit. Please try again later.");
    }
    
    return Promise.reject(error);
  }
);

// Authentication APIs
export const login = async (credentials) => {
  return await API.post("login/", credentials);
};

export const register = async (userData) => {
  return await API.post("register/", userData);
};

// Appointment APIs
export const bookAppointment = async (appointmentData) => {
  return await API.post("appointments/create/", appointmentData);
};

export const fetchAppointments = async (page = 1, dateFilter = "") => {
  let url = `appointments/view/?page=${page}`;
  if (dateFilter) {
    url += `&date=${dateFilter}`;
  }
  
  try {
    const response = await API.get(url);
    console.log("API Response in fetchAppointments:", response);
    return response;
  } catch (error) {
    console.error("Error in fetchAppointments:", error);
    throw error;
  }
};

export const updateAppointment = async (appointmentData) => {
  // Log what we're sending to the API
  console.log("Sending update data:", appointmentData);
  
  // Make sure the required fields are included
  if (!appointmentData.id) {
    console.error("Missing appointment ID for update");
    throw new Error("Appointment ID is required for updates");
  }
  
  try {
    return await API.put("appointments/update/", {
      id: appointmentData.id,
      date: appointmentData.date,
      time: appointmentData.time || "09:00"
    });
  } catch (error) {
    console.error("API Error in updateAppointment:", error);
    throw error;
  }
};

// Payment APIs
export const createOrder = async (paymentData) => {
  // Add idempotency key for safer payment processing
  const idempotencyKey = `order-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
  return await API.post("create-order/", paymentData, {
    headers: {
      'X-Idempotency-Key': idempotencyKey
    }
  });
};

export const verifyPayment = async (paymentData) => {
  return await API.post("verify-payment/", paymentData);
};

// Profile Management APIs
export const fetchProfiles = async () => {
  return await API.get("profiles/");
};

export const createProfile = async (profileData) => {
  return await API.post("profiles/", profileData);
};

export const updateProfile = async (profileName, profileData) => {
  return await API.put(`profiles/${profileName}/`, profileData);
};

export const deleteProfile = async (profileName) => {
  return await API.delete(`profiles/${profileName}/`);
};

export const getProfileForAppointment = async (profileName) => {
  return await API.get(`profiles/appointment/${profileName}/`);
};

export const cancelAppointment = async (appointmentId) => {
  return await API.delete(`appointments/cancel/${appointmentId}/`);
};

export default API;