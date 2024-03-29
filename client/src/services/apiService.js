import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true, // Add this option to enable sending cookies
});

console.log("apiService", apiService);

// Function to handle request errors
const handleError = (error) => {
  console.error("API Error:", error);
  throw error;
};

export const get = async (url, params) => {
  try {
    const response = await apiService.get(url, { params });
    console.log(response, "fegeseerg");
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const post = async (url, data) => {
  try {
    const response = await apiService.post(url, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const put = async (url, data) => {
  try {
    const response = await apiService.put(url, data);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const del = async (url) => {
  try {
    const response = await apiService.delete(url);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default apiService;
