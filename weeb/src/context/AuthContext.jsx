import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshAccessToken = useCallback(async () => {
    const response = await apiClient.post(endpoints.authRefresh, {}, { skipAuth: true });
    const token = response.data?.access || null;
    if (token) {
      setAccessToken(token);
    }
    return token;
  }, []);

  const fetchMe = useCallback(async () => {
    const response = await apiClient.get(endpoints.authMe);
    setUser(response.data);
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await apiClient.post(
      endpoints.authLogin,
      { email, password },
      { skipAuth: true }
    );
    setAccessToken(response.data.access);
    setUser(response.data.user);
    return response.data;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await apiClient.post(endpoints.authRegister, payload, { skipAuth: true });
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post(endpoints.authLogout, {}, { skipAuth: true });
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const requestId = apiClient.interceptors.request.use((config) => {
      if (!config.skipAuth && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });

    let refreshPromise = null;
    const responseId = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config || {};
        if (error.response?.status === 401 && !original._retry && !original.skipAuth) {
          original._retry = true;
          try {
            if (!refreshPromise) {
              refreshPromise = refreshAccessToken();
            }
            const newToken = await refreshPromise;
            refreshPromise = null;
            if (newToken) {
              original.headers = original.headers || {};
              original.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(original);
            }
          } catch (refreshError) {
            refreshPromise = null;
            await logout();
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      apiClient.interceptors.request.eject(requestId);
      apiClient.interceptors.response.eject(responseId);
    };
  }, [accessToken, refreshAccessToken, logout]);

  useEffect(() => {
    const init = async () => {
      try {
        const token = await refreshAccessToken();
        if (token) {
          await fetchMe();
        }
      } catch (error) {
        setAccessToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, [refreshAccessToken, fetchMe]);

  const value = useMemo(() => {
    const isAuthenticated = Boolean(accessToken);
    const isMember = Boolean(user?.is_active);
    const isAdmin = Boolean(user?.is_staff);

    return {
      accessToken,
      user,
      isAuthenticated,
      isMember,
      isAdmin,
      loading,
      login,
      register,
      logout,
      refreshAccessToken,
    };
  }, [accessToken, user, loading, login, register, logout, refreshAccessToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit etre utilise dans AuthProvider");
  }
  return context;
}
