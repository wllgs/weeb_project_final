import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../config/api";

const formatDateTime = (isoString) => {
  if (!isoString) return "Date inconnue";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) {
    return "Date inconnue";
  }
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const satisfactionLabel = (value) => (value === 1 ? "Positif" : "Negatif");

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMessages = async (url = endpoints.contactMessages) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(url);
      const payload = response.data;
      const list = Array.isArray(payload) ? payload : payload.results || [];
      setMessages(list);
      setPagination(payload.results ? payload : null);
    } catch (err) {
      setError(err?.response?.data?.detail || "Impossible de charger les commentaires.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-12">
        <section className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Commentaires de contact</h1>
          <p className="text-gray-300 text-lg">
            Consultez les messages envoyes via le formulaire et leur satisfaction.
          </p>
        </section>

        <section className="max-w-5xl mx-auto bg-[#1E1E3F] border border-purple-500/30 rounded-2xl p-6">
          {error && <p className="text-red-400 mb-4">{error}</p>}

          {loading ? (
            <p className="text-center text-gray-300">Chargement...</p>
          ) : (
            <div className="space-y-4">
              {messages.length === 0 && (
                <p className="text-center text-gray-300">Aucun commentaire trouve.</p>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="border border-purple-500/20 rounded-xl p-4 space-y-3"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span
                      className={
                        message.satisfaction === 1
                          ? "text-green-300 uppercase tracking-wide"
                          : "text-red-300 uppercase tracking-wide"
                      }
                    >
                      {satisfactionLabel(message.satisfaction)}
                    </span>
                    <span className="text-gray-400">{formatDateTime(message.created_at)}</span>
                  </div>
                  <p className="text-gray-200 whitespace-pre-line">{message.message}</p>
                </div>
              ))}
              {pagination && (pagination.next || pagination.previous) && (
                <div className="flex items-center justify-center gap-4 pt-4">
                  <Button
                    onClick={() => pagination.previous && loadMessages(pagination.previous)}
                    disabled={!pagination.previous}
                    className="bg-transparent border border-white text-white"
                  >
                    Page precedente
                  </Button>
                  <div className="text-gray-300">
                    Page {pagination.current_page ?? "?"} / {pagination.total_pages ?? "?"}
                  </div>
                  <Button
                    onClick={() => pagination.next && loadMessages(pagination.next)}
                    disabled={!pagination.next}
                    className="bg-transparent border border-white text-white"
                  >
                    Page suivante
                  </Button>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
