const normalizeBaseUrl = (value, fallback) => {
  if (!value) {
    return fallback;
  }
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

const DEFAULT_API_BASE_URL = "http://localhost:8000/api";

export const API_BASE_URL = normalizeBaseUrl(
  import.meta.env.VITE_API_BASE_URL,
  DEFAULT_API_BASE_URL,
);

const toBackendBaseUrl = (apiBaseUrl) => {
  try {
    const url = new URL(apiBaseUrl);
    const trimmedPath = url.pathname.replace(/\/+$/, "");
    if (trimmedPath.endsWith("/api")) {
      url.pathname = trimmedPath.slice(0, -4) || "/";
    }
    return url.toString().replace(/\/$/, "");
  } catch (error) {
    return apiBaseUrl.replace(/\/+$/, "").replace(/\/api$/, "");
  }
};

export const BACKEND_BASE_URL = toBackendBaseUrl(API_BASE_URL);

const withBase = (path) => `${API_BASE_URL}${path}`;

export const endpoints = {
  articles: withBase("/articles/"),
  articleDetail: (id) => withBase(`/articles/${id}/`),
  contact: withBase("/contact/"),
  contactMessages: withBase("/contact/messages/"),
  analytics: withBase("/analytics/satisfaction/"),
  authRegister: withBase("/auth/register/"),
  authLogin: withBase("/auth/login/"),
  authRefresh: withBase("/auth/refresh/"),
  authLogout: withBase("/auth/logout/"),
  authMe: withBase("/auth/me/"),
  authPasswordReset: withBase("/auth/password-reset/"),
  authPasswordResetConfirm: withBase("/auth/password-reset/confirm/"),
  authUsers: withBase("/auth/users/"),
  authUserDetail: (id) => withBase(`/auth/users/${id}/`),
};

export default {
  API_BASE_URL,
  BACKEND_BASE_URL,
  endpoints,
};
