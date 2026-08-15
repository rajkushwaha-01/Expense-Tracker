import api from "./api";
export const authService = {
  login: async (email, password) =>
    (await api.post("/auth/login", { email, password })).data,
  register: async (username, email, password) =>
    (await api.post("/auth/register", { username, email, password })).data,
  logout: async () => {
    // Logout is handled on frontend side with HTTP-only cookies
    // No backend endpoint needed - just clear local state
  },
  me: async () => {
    try {
      return (await api.get("/auth/me")).data;
    } catch (err) {
      // If me endpoint doesn't exist, return null to handle gracefully
      return null;
    }
  },
};
