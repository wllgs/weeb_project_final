const normalizeBaseUrl = (value) => {
  if (!value) {
    return "http://localhost:8000/api";
  }
  return value.endsWith("/") ? value.slice(0, -1) : value;
};

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);

const withBase = (path) => `${API_BASE_URL}${path}`;

export const endpoints = {
  articles: withBase("/articles/"),
  articleDetail: (id) => withBase(`/articles/${id}/`),
  contact: withBase("/contact/"),
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
  endpoints,
};
