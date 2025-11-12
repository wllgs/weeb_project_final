import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import useForm from "../hooks/useForm";
import useFetch from "../hooks/useFetch";
import { endpoints } from "../config/api";
import { motion } from "framer-motion";

const initialValues = {
  nom: "",
  prenom: "",
  telephone: "",
  email: "",
  message: "",
  newsletter: false,
};

export default function Contact() {
  const { values, setValues, focus, handleChange, handleInputFocus, handleInputBlur } = useForm(initialValues);
  const { loading, fetchData } = useFetch();
  const [status, setStatus] = useState(null);

  const inputStyles = {
    base: "bg-transparent border-b p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none transition-all duration-200",
    focused: "border-2 border-purple-400 rounded-md",
    unfocused: "border-purple-500",
  };

  const inputStyle = (field) => `${inputStyles.base} ${focus[field] ? inputStyles.focused : inputStyles.unfocused}`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const payload = {
      first_name: values.prenom.trim(),
      last_name: values.nom.trim(),
      phone: values.telephone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      newsletter_opt_in: Boolean(values.newsletter),
    };

    if (!payload.email || !payload.message) {
      setStatus({ type: "error", message: "Merci de renseigner au minimum votre email et votre message." });
      return;
    }

    try {
      await fetchData(endpoints.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus({ type: "success", message: "Merci pour votre message ! Nous revenons vers vous trÃ¨s vite." });
      setValues(initialValues);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Impossible d'enregistrer votre message, veuillez rÃ©essayer.",
      });
    }
  };

  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex flex-col justify-between">
      <Header />

      <main className="px-4 py-10 flex-grow mb-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Votre avis compte !</h1>
          <p className="text-gray-300 text-base text-xl mb-14">
            Votre retour est essentiel ! <strong>Partagez votre expérience</strong>, dites-nous ce que vous aimez et
            ce que nous pourrions améliorer. Vos suggestions nous aident à faire de ce blog une ressource toujours plus
            utile et enrichissante.<br /><br />
            Tenez vous informé des <strong>dernières nouveautés</strong> en vous abonnant à notre newsletter!
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto border-2 border-purple-500 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 bg-[#1E1E3F]"
        >
          <input
            className={inputStyle("nom")}
            type="text"
            placeholder={focus.nom ? "" : "Nom"}
            name="nom"
            value={values.nom}
            onChange={handleChange}
            onFocus={handleInputFocus("nom")}
            onBlur={handleInputBlur("nom")}
            autoComplete="family-name"
            required
          />
          <input
            className={inputStyle("prenom")}
            type="text"
            placeholder={focus.prenom ? "" : "Prénom"}
            name="prenom"
            value={values.prenom}
            onChange={handleChange}
            onFocus={handleInputFocus("prenom")}
            onBlur={handleInputBlur("prenom")}
            autoComplete="given-name"
            required
          />
          <input
            className={inputStyle("telephone")}
            type="tel"
            placeholder={focus.telephone ? "" : "Téléphone"}
            name="telephone"
            value={values.telephone}
            onChange={handleChange}
            onFocus={handleInputFocus("telephone")}
            onBlur={handleInputBlur("telephone")}
            autoComplete="tel"
          />
          <input
            className={inputStyle("email")}
            type="email"
            placeholder={focus.email ? "" : "Email"}
            name="email"
            value={values.email}
            onChange={handleChange}
            onFocus={handleInputFocus("email")}
            onBlur={handleInputBlur("email")}
            autoComplete="email"
            required
          />
            <textarea
              className={`bg-transparent border-b md:border-2 md:rounded-md p-2 text-white text-center text-2xl placeholder-purple-400 focus:outline-none md:col-span-2 transition-all duration-200 ${
                focus.message ? "border-2 border-purple-400 rounded-md" : "border-purple-500"
              }`}
              rows="4"
              placeholder={focus.message ? "" : "Message"}
              name="message"
              value={values.message}
              onChange={handleChange}
              onFocus={handleInputFocus("message")}
              onBlur={handleInputBlur("message")}
              required
            ></textarea>
          <label className="md:col-span-2 flex flex-col md:flex-row justify-center items-center gap-3 text-lg text-purple-300 font-semibold text-center">
            <input
              type="checkbox"
              name="newsletter"
              checked={values.newsletter}
              onChange={handleChange}
              className="w-6 h-6 border-2 border-purple-400 rounded-md bg-transparent accent-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            Être tenu informé des prochaines nouveautés (newsletter)
          </label>
          <div className="md:col-span-2 flex flex-col items-center mt-2 py-2 gap-4">
            <Button type="submit" className="mt-2" disabled={loading}>
              {loading ? "Envoi en cours..." : "Envoyer"}
            </Button>
            {status && (
              <p className={status.type === "success" ? "text-green-400" : "text-red-400"}>{status.message}</p>
            )}
          </div>
        </motion.form>
      </main>

      <Footer />
    </div>
  );
}

