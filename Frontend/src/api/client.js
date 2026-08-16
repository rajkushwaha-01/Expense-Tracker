import axios from "axios";

// Point this at your backend. Configure via .env -> VITE_API_URL
// Falls back to localhost:3000 (the backend's default PORT).
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // send/receive the httpOnly-less "token" cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Normalize error messages coming from the backend's
// { success: false, message } shape.
client.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default client;
