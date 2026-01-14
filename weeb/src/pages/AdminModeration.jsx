import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../config/api";

export default function AdminModeration() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState(null);

  const loadUsers = async (url = endpoints.authUsers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(url);
      const payload = response.data;
      const list = Array.isArray(payload) ? payload : payload.results || [];
      setUsers(list);
      setPagination(payload.results ? payload : null);
    } catch (err) {
      setError(err?.response?.data?.detail || "Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleActive = async (user) => {
    setUpdatingId(user.id);
    try {
      const response = await apiClient.patch(endpoints.authUserDetail(user.id), {
        is_active: !user.is_active,
      });
      const updated = response.data;
      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    } catch (err) {
      setError(err?.response?.data?.detail || "Impossible de mettre a jour ce compte.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow px-4 py-12">
        <section className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Moderation des comptes</h1>
          <p className="text-gray-300 text-lg">
            Activez ou desactivez les membres pour controler l'acces a la creation d'articles.
          </p>
        </section>

        <section className="max-w-5xl mx-auto bg-[#1E1E3F] border border-purple-500/30 rounded-2xl p-6">
          {error && <p className="text-red-400 mb-4">{error}</p>}

          {loading ? (
            <p className="text-center text-gray-300">Chargement...</p>
          ) : (
            <div className="space-y-4">
              {users.length === 0 && (
                <p className="text-center text-gray-300">Aucun utilisateur trouve.</p>
              )}
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-purple-500/20 rounded-xl p-4"
                  data-testid={`user-card-${user.id}`}
                  data-email={user.email}
                >
                  <div>
                    <p className="text-lg font-semibold">{user.email}</p>
                    <p className="text-sm text-gray-400">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs uppercase tracking-wide mt-2 text-purple-300">
                      {user.is_staff ? "Admin" : user.is_active ? "Actif" : "Inactif"}
                    </p>
                  </div>
                  {!user.is_staff && (
                    <Button
                      onClick={() => handleToggleActive(user)}
                      disabled={updatingId === user.id}
                      className={user.is_active ? "bg-transparent border border-white text-white" : ""}
                    >
                      {updatingId === user.id
                        ? "Mise a jour..."
                        : user.is_active
                        ? "Desactiver"
                        : "Activer"}
                    </Button>
                  )}
                </div>
              ))}
              {pagination && (pagination.next || pagination.previous) && (
                <div className="flex items-center justify-center gap-4 pt-4">
                  <Button
                    onClick={() => pagination.previous && loadUsers(pagination.previous)}
                    disabled={!pagination.previous}
                    className="bg-transparent border border-white text-white"
                  >
                    Page precedente
                  </Button>
                  <div className="text-gray-300">
                    Page {pagination.current_page ?? "?"} / {pagination.total_pages ?? "?"}
                  </div>
                  <Button
                    onClick={() => pagination.next && loadUsers(pagination.next)}
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
