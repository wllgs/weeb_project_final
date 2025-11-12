const normalizeBaseUrl = (value) => {
  if (!value) {
    return "http://127.0.0.1:8000/api";
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
};

export default {
  API_BASE_URL,
  endpoints,
};
