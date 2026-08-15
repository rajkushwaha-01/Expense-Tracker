import api from "./api";
export const accountService = {
  getAccounts: async () => (await api.get("/accounts")).data,
  createAccount: async (data) => (await api.post("/accounts", data)).data,
};
