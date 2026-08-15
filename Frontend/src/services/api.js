import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (
      err.response &&
      err.response.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.dispatchEvent(new Event("unauthorized"));
    }
    return Promise.reject(err);
  },
);
export default api;
