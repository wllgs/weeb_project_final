import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import { apiClient } from "../lib/apiClient";
import { endpoints } from "../config/api";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await apiClient.post(endpoints.authPasswordReset, { email: email.trim() }, { skipAuth: true });
      setStatus({
        type: "success",
        message: "Si le compte existe, un email a ete envoye.",
      });
    } catch (error) {
      setStatus({ type: "error", message: "Impossible d'envoyer la demande." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F172A] text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center px-6 py-10 mb-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Mot de passe oublie</h1>
          <p className="text-gray-300 mb-8">Indiquez votre email pour recevoir un lien de reinitialisation.</p>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              className="bg-transparent border-b p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none border-purple-500 focus:border-purple-400"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer le lien"}
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
