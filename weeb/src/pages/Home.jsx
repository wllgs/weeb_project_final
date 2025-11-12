import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="bg-[#0F172A] text-white min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="text-center px-4 py-14 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Explorez le <span className="font-normal text-purple-400">Web</span> sous toutes ses{" "}
          <span className="relative">
            <span
              className="inline-block border-b-2 border-purple-400"
              style={{ paddingBottom: "0.1em", borderBottomWidth: "5px" }}
            >
              facettes
            </span>
          </span>
        </h1>
        <p className="text-xl text-gray-300 mt-8 mb-10">
          Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies
          et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre
          du contenu de qualité pour rester à la pointe.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-4 mt-4 w-full">
          <motion.div
            initial={{ x: -10 }}
            animate={{ x: [-10, 10, -8, 8, -6, 6, -4, 4, -2, 2, 0] }}
            transition={{ duration: 0.6, type: "tween" }}
            className="w-full md:w-auto"
          >
            <Button as={Link} to="/articles" className="w-full md:w-auto text-center">
              Découvrir les articles
            </Button>
          </motion.div>
          <motion.div
            initial={{ x: 10 }}
            animate={{ x: [10, -10, 8, -8, -6, 6, -4, 4, -2, 2, 0] }}
            transition={{ duration: 0.6, type: "tween" }}
            className="w-full md:w-auto"
          >
            <Button
              className="bg-transparent border border-white text-white hover:bg-white hover:text-[#0F172A] w-full md:w-auto text-center"
              as={Link}
              to="/contact"
            >
              S'abonner à la newsletter
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Illustration */}
      <section className="flex justify-center py-14 px-4">
        <motion.img
          src={heroImg}
          alt="Ressources"
          className="rounded-xl shadow-lg w-full max-w-2xl md:max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </section>

      {/* Clients */}
      <section className="text-center py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-16">Ils nous font confiance</h2>
        <div className="flex flex-wrap justify-center items-center gap-16 px-4">
          <img src="logos/smartfinder.png" alt="SmartFinder" className="h-7" />
          <img src="logos/zoomerr.png" alt="Zoomerr" className="h-7" />
          <img src="logos/shells.png" alt="Shells" className="h-7" />
          <img src="logos/waves.png" alt="Waves" className="h-7" />
          <img src="logos/artvenue.png" alt="ArtVenue" className="h-7" />
        </div>
      </section>

      {/* Ressources */}
      <section className="grid md:grid-cols-2 px-6 py-24 max-w-6xl mx-auto items-center">
        <div>
          <h3 className="text-white text-xl font-semibold mb-5 tracking-widest uppercase">
            Des ressources pour tous les niveaux
          </h3>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            <span className="text-purple-400">Apprenez</span> <span className="text-white">et </span>{" "}
            <span className="text-purple-400">progressez</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos
            connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement.
          </p>
          <Link to="/articles" className="text-white font-semibold flex items-center gap-2 text-lg">
            <span className="hover:underline">Explorer les ressources</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div>
          <motion.img
            src={heroImg}
            alt="Ressources"
            className="rounded-xl shadow-lg w-full max-w-2xl md:max-w-4xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </section>

      {/* Tendances */}
      <section className="grid md:grid-cols-3 gap-16 py-14 px-6 max-w-6xl mx-auto items-center">
        <div className="hidden md:flex justify-center col-span-1">
          <img src="logos/Shapes.png" alt="Illustration Tendances" className="w-full max-w-sm" />
        </div>
        <div className="col-span-3 md:col-span-2">
          <h3 className="text-white text-xl font-semibold mb-5 tracking-widest uppercase">
            Le web, un écosystème en constante évolution
          </h3>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Restez informé des dernières <span className="text-purple-400">tendances</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO,
            accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !
          </p>
          <Link to="/articles" className="text-white font-semibold flex items-center gap-2 text-lg">
            <span className="hover:underline">Lire les articles récents</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
