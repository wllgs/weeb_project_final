import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import useForm from "../hooks/useForm";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { register } = useAuth();
  const { values, focus, handleChange, handleInputFocus, handleInputBlur } = useForm({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const translateMessage = (field, message) => {
    const text = String(message || "");
    const normalized = text.toLowerCase();
    if (field === "password") {
      if (normalized.includes("too short")) {
        return "Mot de passe : 12 caracteres minimum.";
      }
      if (normalized.includes("too common")) {
        return "Mot de passe : trop courant, choisissez-en un autre.";
      }
      if (normalized.includes("entirely numeric")) {
        return "Mot de passe : ne peut pas etre uniquement des chiffres.";
      }
      if (normalized.includes("too similar")) {
        return "Mot de passe : trop proche de vos informations personnelles.";
      }
    }
    if (field === "email") {
      if (normalized.includes("already exists")) {
        return "Email : un compte existe deja avec cet email.";
      }
      if (normalized.includes("valid email")) {
        return "Email : adresse email invalide.";
      }
    }
    if (normalized.includes("may not be blank") || normalized.includes("required")) {
      const labelMap = {
        email: "Email",
        password: "Mot de passe",
        first_name: "Prenom",
        last_name: "Nom",
      };
      const label = labelMap[field] || "Champ";
      return `${label} : champ obligatoire.`;
    }
    return text;
  };

  const formatErrorMessage = (error) => {
    const data = error?.response?.data;
    if (!data) {
      return ["Impossible de creer le compte."];
    }
    if (typeof data === "string") {
      return [data];
    }
    if (data.detail) {
      return [String(data.detail)];
    }
    if (typeof data === "object") {
      const fieldLabels = {
        email: "Email",
        password: "Mot de passe",
        first_name: "Prenom",
        last_name: "Nom",
      };
      const messages = [];
      Object.entries(data).forEach(([field, value]) => {
        if (Array.isArray(value)) {
          value.forEach((msg) => messages.push(translateMessage(field, msg)));
        } else if (value) {
          messages.push(translateMessage(field, value));
        }
      });
      if (messages.length > 0) {
        return messages;
      }
    }
    return ["Impossible de creer le compte."];
  };

  const inputClass = (field) => `
    bg-transparent border-b p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none transition-all duration-200
    ${focus[field] ? "border-2 border-purple-400 rounded-md" : "border-purple-500"}
  `;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      await register({
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      setStatus({
        type: "success",
        message: "Compte cree ! Un administrateur doit activer votre acces avant connexion.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: formatErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0F172A] text-white">
      <Header />

      <main className="flex-grow flex items-center justify-center px-6 py-10 mb-10">
        <div className="w-full max-w-md text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Creer un compte</h1>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              className={inputClass('first_name')}
              type="text"
              name="first_name"
              value={values.first_name}
              placeholder={focus.first_name ? "" : "Prenom"}
              onFocus={handleInputFocus('first_name')}
              onBlur={handleInputBlur('first_name')}
              onChange={handleChange}
              required
            />
            <input
              className={inputClass('last_name')}
              type="text"
              name="last_name"
              value={values.last_name}
              placeholder={focus.last_name ? "" : "Nom"}
              onFocus={handleInputFocus('last_name')}
              onBlur={handleInputBlur('last_name')}
              onChange={handleChange}
              required
            />
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
            <p className="text-xs text-purple-200">
              Mot de passe : 12 caracteres minimum, 1 majuscule, 1 chiffre.
            </p>

            <Button type="submit" className="mt-4 mx-auto" disabled={loading}>
              {loading ? "Creation..." : "Creer mon compte"}
            </Button>

            {status && status.type === "success" && (
              <div className="text-green-400 text-sm space-y-1">
                <p>{status.message}</p>
                <p>
                  Vous pouvez retourner a la{" "}
                  <Link to="/login" className="underline hover:text-white transition">
                    page de connexion
                  </Link>
                  .
                </p>
              </div>
            )}
            {status && status.type === "error" && (
              <div className="text-red-400 text-sm space-y-1">
                {(Array.isArray(status.message) ? status.message : [status.message]).map((msg, index) => (
                  <p key={index}>{msg}</p>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-400 mt-4">
              <p>
                Deja un compte ?{' '}
                <Link to="/login" className="underline hover:text-white transition">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
