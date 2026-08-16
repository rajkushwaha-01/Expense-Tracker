import client from "./client";

export const registerApi = (payload) =>
  client.post("/auth/register", payload).then((r) => r.data);

export const loginApi = (payload) =>
  client.post("/auth/login", payload).then((r) => r.data);

export const getMeApi = () =>
  client.get("/auth/me").then((r) => r.data);

// The backend exposes no /logout route — the auth cookie set via
// res.cookie() is not httpOnly, so we can clear it client-side.
export const clearAuthCookie = () => {
  document.cookie =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
