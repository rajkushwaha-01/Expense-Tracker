import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  getMeApi,
  loginApi,
  registerApi,
  clearAuthCookie,
} from "../api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const checkAuth = useCallback(async () => {
    try {
      const data = await getMeApi();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (payload) => {
    setError("");
    const data = await loginApi(payload);
    setUser(data.user);
    return data;
  };

  const register = async (payload) => {
    setError("");
    const data = await registerApi(payload);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    clearAuthCookie();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setError,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
