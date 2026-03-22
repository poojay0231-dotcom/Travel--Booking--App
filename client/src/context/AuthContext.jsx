import { createContext, useContext, useEffect, useState } from "react";
import { clearToken, getToken, saveToken } from "../utils/auth";
import { apiFetch } from "../utils/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = getToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await apiFetch("/api/auth/me");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load user");
      }

      setUser(data);
    } catch (err) {
      console.error("Auth load error:", err);
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (token) => {
    saveToken(token);
    await loadUser();
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}