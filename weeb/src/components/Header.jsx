import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, isMember, isAdmin, user, logout } = useAuth();

  return (
    <header className="w-full bg-transparent py-8 flex justify-center">
      <div className="bg-[#FFFFFF0D] rounded-2xl shadow-2xl w-full max-w-3xl md:max-w-5xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold text-white">weeb</Link>
        </div>
        <div className="flex items-center gap-6 flex-nowrap">
          <Link to="/articles" className="hidden md:inline-block text-white text-base font-normal hover:text-purple-400 transition">
            Articles
          </Link>
          {isMember && (
            <Link to="/articles/new" className="hidden md:inline-block text-white text-base font-normal hover:text-purple-400 transition">
              Publier
            </Link>
          )}
          {isAdmin && (
            <Link to="/admin/moderation" className="hidden md:inline-block text-white text-base font-normal hover:text-purple-400 transition">
              Moderation
            </Link>
          )}
          <Link to="/contact" className="hidden md:inline-block text-white text-base font-normal hover:text-purple-400 transition">
            Contact
          </Link>
          {!isAuthenticated ? (
            <Button className="hidden md:inline-block text-base" as={Link} to="/login">
              Se connecter
            </Button>
          ) : (
            <div className="hidden md:flex items-center gap-3 flex-nowrap whitespace-nowrap">
              {user && (
                <span className="text-xs text-purple-200 whitespace-nowrap">
                  Bonjour {user.first_name || user.email}
                </span>
              )}
              {isAdmin && (
                <a
                  href="http://localhost:8000/admin/"
                  className="text-xs uppercase tracking-wide text-purple-300 hover:text-purple-100 whitespace-nowrap"
                  target="_blank"
                  rel="noreferrer"
                >
                  Admin
                </a>
              )}
              <Button className="text-base whitespace-nowrap" onClick={logout}>
                Se deconnecter
              </Button>
            </div>
          )}

          {/* Burger menu pour mobile */}
          <button
            className="md:hidden ml-2 bg-purple-600 hover:bg-purple-500 rounded-lg p-2 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 6.75h15m-15 5.25h15m-15 5.25h15" />
            </svg>
          </button>
        </div>
      </div>
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#232B3B] bg-opacity-90 flex flex-col items-center justify-center">
          <button
            className="absolute top-10 right-6 text-4xl text-white rounded-full p-2 transition"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            &times;
          </button>
          <Link
            to="/articles"
            className="text-white text-xl font-normal mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            Articles
          </Link>
          {isMember && (
            <Link
              to="/articles/new"
              className="text-white text-xl font-normal mb-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Publier
            </Link>
          )}
          {isAdmin && (
            <Link
              to="/admin/moderation"
              className="text-white text-xl font-normal mb-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Moderation
            </Link>
          )}
          <Link
            to="/contact"
            className="text-white text-xl font-normal mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          {!isAuthenticated ? (
            <Button className="text-xl mb-2" onClick={() => setIsMenuOpen(false)} as={Link} to="/login">
              Se connecter
            </Button>
          ) : (
            <Button className="text-xl mb-2" onClick={logout}>
              Se deconnecter
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
