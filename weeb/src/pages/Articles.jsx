import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ArticleCard from "../components/ArticleCard";
import useFetch from "../hooks/useFetch";
import { endpoints } from "../config/api";

const ArticleSkeleton = () => (
  <div className="bg-[#1E1E3F] rounded-2xl p-6 border border-purple-500/30 shadow-lg animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
      <div className="h-6 w-48 bg-purple-500/30 rounded" />
      <div className="h-4 w-32 bg-purple-500/30 rounded" />
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-purple-500/20 rounded" />
      <div className="h-4 w-full bg-purple-500/20 rounded" />
      <div className="h-4 w-2/3 bg-purple-500/20 rounded" />
    </div>
  </div>
);

export default function Articles() {
  const { isMember, user } = useAuth();
  const { data, loading, error, fetchData } = useFetch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(`${endpoints.articles}?page=${page}`);
  }, [fetchData, page]);

  const articles = useMemo(() => data?.results ?? [], [data]);

  const canGoPrev = Boolean(data?.previous);
  const canGoNext = Boolean(data?.next);

  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-12 w-full">
        <section className="max-w-5xl mx-auto text-center mb-12">
          {isMember && (
            <div className="flex justify-center mb-6">
              <Button as={Link} to="/articles/new">
                Publier un article
              </Button>
            </div>
          )}
          <p className="text-sm uppercase tracking-widest text-purple-300 mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Les articles de la communauté</h1>
          <p className="text-gray-300 text-lg">
            Retrouvez ici toutes les publications de <strong>Weeb</strong>. <br />
            Connectez-vous en tant qu’administrateur pour publier,
            éditer ou supprimer des articles.
          </p>
        </section>

        <section className="max-w-5xl mx-auto space-y-10">
          {error && (
            <p className="text-center text-red-400">
              Impossible de récupérer les articles&nbsp;: {error.message || "veuillez réessayer plus tard."}
            </p>
          )}

          {loading && (
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <ArticleSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <p className="text-center text-gray-300">Aucun article pour le moment. Revenez bientôt !</p>
          )}

          <AnimatePresence mode="wait">
            {!loading && !error && articles.length > 0 && (
              <motion.div
                key={`articles-page-${page}-${articles.length}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid gap-6"
              >
                {articles.map((article) => (
                  <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl"
                  >
                    <ArticleCard
                      article={article}
                      draftLabel={user && article.author?.id === user.id ? "Brouillon (vous)" : "Brouillon"}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {data && (canGoPrev || canGoNext) && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button onClick={() => canGoPrev && setPage((prev) => Math.max(prev - 1, 1))} disabled={!canGoPrev || loading}>
                Page précédente
              </Button>
              <div className="text-gray-300">
                Page {data.current_page ?? page} / {data.total_pages ?? "?"}
              </div>
              <Button
                onClick={() => canGoNext && setPage((prev) => prev + 1)}
                disabled={!canGoNext || loading}
                className="bg-transparent border border-white text-white hover:bg-white hover:text-[#0F172A]"
              >
                Page suivante
              </Button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
