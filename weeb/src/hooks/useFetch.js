import { useState, useCallback } from "react";

export default function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const { headers: customHeaders = {}, ...rest } = options;
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          ...customHeaders,
        },
        ...rest,
      });
      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await response.json() : null;

      if (!response.ok) {
        const message = (payload && (payload.detail || payload.message)) || "Une erreur est survenue.";
        const networkError = new Error(message);
        networkError.status = response.status;
        throw networkError;
      }

      setData(payload);
      setLoading(false);
      return payload;
    } catch (err) {
      if (err.name === "AbortError") {
        setLoading(false);
        return null;
      }
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { loading, error, data, fetchData };
}
