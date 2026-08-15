import api from "./api";
export const analyticsService = {
  getAnalytics: async () => (await api.get("/analytics")).data,
};
