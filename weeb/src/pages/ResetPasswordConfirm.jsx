import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../config/api";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await apiClient.post(
        endpoints.authPasswordResetConfirm,
        { uid, token, new_password: password },
        { skipAuth: true }
      );
      setStatus({ type: "success", message: "Mot de passe mis a jour." });
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setStatus({ type: "error", message: "Impossible de reinitialiser le mot de passe." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F172A] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-10 mb-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nouveau mot de passe</h1>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              className="bg-transparent border-b p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none border-purple-500 focus:border-purple-400"
              type="password"
              value={password}
              placeholder="Nouveau mot de passe"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Mise a jour..." : "Mettre a jour"}
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
