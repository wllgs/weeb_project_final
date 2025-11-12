import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import useFetch from "../hooks/useFetch";
import { endpoints } from "../config/api";

const formatDateTime = (isoString) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const DetailSkeleton = () => (
  <div className="bg-[#1E1E3F] rounded-2xl p-8 border border-purple-500/30 shadow-lg animate-pulse space-y-6">
    <div className="space-y-3">
      <div className="h-4 w-32 bg-purple-500/30 rounded" />
      <div className="h-8 w-64 bg-purple-500/30 rounded" />
      <div className="h-4 w-48 bg-purple-500/20 rounded" />
    </div>
    <div className="space-y-3">
      <div className="h-4 w-full bg-purple-500/20 rounded" />
      <div className="h-4 w-full bg-purple-500/20 rounded" />
      <div className="h-4 w-3/4 bg-purple-500/20 rounded" />
      <div className="h-4 w-2/3 bg-purple-500/20 rounded" />
    </div>
  </div>
);

export default function ArticleDetail() {
  const { id } = useParams();
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    if (id) {
      fetchData(endpoints.articleDetail(id));
    }
  }, [id, fetchData]);

  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-wrap gap-4 justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold">Articles</h1>
            <Button
              as={Link}
              to="/articles"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-[#0F172A]"
            >
              ← Retour aux articles
            </Button>
          </div>

          {error && (
            <p className="text-red-400">
              Impossible de récupérer cet article : {error.message || "Veuillez réessayer plus tard."}
            </p>
          )}

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="article-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <DetailSkeleton />
              </motion.div>
            )}

            {!loading && !error && data && (
              <motion.article
                key={`article-${data.id}`}
                className="bg-[#1E1E3F] rounded-2xl p-8 border border-purple-500/40 shadow-lg space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <header className="space-y-3">
                  <p className="text-sm uppercase tracking-widest text-purple-300">Article #{data.id}</p>
                  <h2 className="text-3xl font-semibold">{data.title}</h2>
                  {formatDateTime(data.created_at) && (
                    <div className="text-gray-400 text-sm">
                      Publié le {formatDateTime(data.created_at)}
                      {data.updated_at && (
                        <span className="block">Dernière mise à jour : {formatDateTime(data.updated_at)}</span>
                      )}
                    </div>
                  )}
                </header>
                <section className="text-lg leading-relaxed text-gray-200 whitespace-pre-line">
                  {data.content}
                </section>
                {!data.is_published && (
                  <div className="text-yellow-300 text-sm uppercase tracking-wide">Brouillon (non publié)</div>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
