import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from './Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-transparent py-8 flex justify-center">
      <div className="bg-[#FFFFFF0D] rounded-2xl shadow-2xl w-full max-w-3xl md:max-w-4xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-bold text-white">weeb</Link>
        </div>
        <div className="flex items-center space-x-8">
          <Link to="/articles" className="hidden md:inline-block text-white text-base font-normal hover:text-purple-400 transition">
            Articles
          </Link>
          <Link to="/contact" className="hidden md:inline-block text-white text-base font-normal hover:text-purple-400 transition">
            Contact
          </Link>
          <Button
            className="hidden md:inline-block text-base"
            as={Link}
            to="/login"
          >
            Se connecter
          </Button>

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
          <Link
            to="/contact"
            className="text-white text-xl font-normal mb-6"
            onClick={() => setIsMenuOpen(false)}
          >
              Contact
          </Link>
          <Button
            className="text-xl mb-2"
            onClick={() => setIsMenuOpen(false)}
            as={Link}
            to="/login"
          >
            Se connecter
          </Button>
        </div>
      )}
    </header>
  );
}
