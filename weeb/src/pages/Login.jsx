import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { values, focus, handleChange, handleInputFocus, handleInputBlur } = useForm({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputClass = (field) => `
    bg-transparent border-b p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none transition-all duration-200
    ${focus[field] ? "border-2 border-purple-400 rounded-md" : "border-purple-500"}
  `;

  const handleLogin = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);
    try {
      await login(values.email.trim(), values.password);
      navigate("/articles");
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.response?.data?.detail || "Identifiants invalides ou compte inactif.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F172A] text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-14 py-10 mb-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Se connecter</h1>
          
          <p className="text-lg text-purple-300 mb-6">
            Codes d'inscription d'exemple : admin@example.com / AdminPassword1234
          </p>

          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <input
              className={inputClass('email')}
              type="email"
              name="email"
              value={values.email}
              placeholder={focus.email ? "" : "Email"}
              onFocus={handleInputFocus('email')}
              onBlur={handleInputBlur('email')}
              onChange={handleChange}
              required
            />
            <input
              className={inputClass('password')}
              type="password"
              name="password"
              value={values.password}
              placeholder={focus.password ? "" : "Mot de passe"}
              onFocus={handleInputFocus('password')}
              onBlur={handleInputBlur('password')}
              onChange={handleChange}
              required
            />

            <Button type="submit" className="mt-4 mx-auto" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>

            {status && (
              <p className={status.type === "success" ? "text-green-400" : "text-red-400"}>{status.message}</p>
            )}

            <div className="text-sm text-gray-400 mt-4">
              <p className="mb-6 text-white">
                <Link to="/reset-password" className="hover:underline">Mot de passe oublie ?</Link>
              </p>
              <p>
                Vous n'avez pas de compte ? <br />
                <Link to="/signup" className="underline hover:text-white transition">creer un compte</Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
