import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../config/api";
import { useAuth } from "../context/AuthContext";

export default function NewArticle() {
  const { accessToken, refreshAccessToken, isAuthenticated } = useAuth();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEditing) {
      return;
    }
    const loadArticle = async () => {
      setLoadingArticle(true);
      setStatus(null);
      try {
        const response = await apiClient.get(endpoints.articleDetail(id));
        setTitle(response.data?.title || "");
        setContent(response.data?.content || "");
        setIsPublished(Boolean(response.data?.is_published));
      } catch (error) {
        setStatus({
          type: "error",
          message: error?.response?.data?.detail || "Impossible de charger cet article.",
        });
      } finally {
        setLoadingArticle(false);
      }
    };
    loadArticle();
  }, [id, isEditing]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      if (!isAuthenticated) {
        setStatus({ type: "error", message: "Vous devez vous connecter pour publier." });
        return;
      }
      if (!accessToken) {
        const refreshed = await refreshAccessToken();
        if (!refreshed) {
          setStatus({ type: "error", message: "Session expiree. Reconnectez-vous." });
          return;
        }
      }
      const payload = {
        title: title.trim(),
        content: content.trim(),
        is_published: isPublished,
      };

      if (isEditing) {
        await apiClient.patch(endpoints.articleDetail(id), payload);
        setStatus({ type: "success", message: "Article mis a jour avec succes." });
        setTimeout(() => navigate(`/articles/${id}`), 800);
      } else {
        await apiClient.post(endpoints.articles, payload);
        setStatus({ type: "success", message: "Article ajoute avec succes." });
        setTimeout(() => navigate("/articles"), 800);
      }
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error?.response?.status === 401
            ? "Jeton manquant ou expire. Reconnectez-vous."
            : error?.response?.data?.detail || "Impossible d'ajouter l'article.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F172A] text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-10 mb-10">
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">
            {isEditing ? "Modifier l'article" : "Nouvel article"}
          </h1>

          <form className="flex flex-col gap-6 bg-[#1E1E3F] p-6 rounded-2xl border border-purple-500/40" onSubmit={handleSubmit}>
            {loadingArticle && <p className="text-gray-300">Chargement de l'article...</p>}
            <input
              className="bg-transparent border-b p-2 text-white text-2xl placeholder-purple-400 focus:outline-none border-purple-500 focus:border-purple-400"
              type="text"
              value={title}
              placeholder="Titre"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
            <textarea
              className="bg-transparent border p-3 text-white text-lg placeholder-purple-400 focus:outline-none border-purple-500 rounded-md min-h-[200px]"
              value={content}
              placeholder="Contenu"
              onChange={(event) => setContent(event.target.value)}
              required
            />
            <label className="flex items-center justify-center gap-3 text-purple-300 font-semibold">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(event) => setIsPublished(event.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              Publier tout de suite
            </label>

            <Button type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : isEditing ? "Mettre a jour" : "Publier"}
            </Button>
            {status && (
              <p className={status.type === "success" ? "text-green-400" : "text-red-400"}>{status.message}</p>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
