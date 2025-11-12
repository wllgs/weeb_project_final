export default function Footer() {
  return (
    <footer className="bg-white text-[#0F172A] px-4 pt-10 pb-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
        <div className="font-bold text-3xl mb-6 md:mb-0 mx-auto md:mx-0 text-center">weeb</div>
        <div className="mx-auto md:text-left md:mx-0">  
          <h3 className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-widest">Produit</h3>
          <ul className="space-y-1 text-base">
            <li>Tarifs</li>
            <li>Vue d'Ensemble</li>
            <li>Parcourir</li>
            <li>Accessibilité</li>
            <li>Five</li>
          </ul>
        </div>
        <div className="mx-auto md:text-left md:mx-0">
          <h3 className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-widest">Solutions</h3>
          <ul className="space-y-1 text-base">
            <li>Brainstorming</li>
            <li>Idéation</li>
            <li>Objectif</li>
            <li>Recherche</li>
          </ul>
        </div>
        <div className="mx-auto md:text-left md:mx-0">
          <h3 className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-widest">Ressources</h3>
          <ul className="space-y-1 text-base">
            <li>Centre d'Aide</li>
            <li>Blog</li>
            <li>Tutoriels</li>
          </ul>
        </div>
        <div className="mx-auto md:text-left md:mx-0">
          <h3 className="text-sm text-gray-500 mb-2 font-semibold uppercase tracking-widest">Entreprise</h3>
          <ul className="space-y-1">
            <li>A propos</li>
            <li>Presse</li>
            <li>Evénements</li>
            <li>Carrière</li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-10 pt-6 pb-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <p className="text-center text-sm py-6">@ 2025 Weeb, Inc. Tous droits réservés.</p>
          <div className="flex justify-center md:justify-end gap-4 mt-4 md:mt-0 py-4">
            <a href="#" aria-label="YouTube">
              <img src="logos/youtube.png" alt="YouTube" className="w-6 h-6" /> 
            </a>
            <a href="#" aria-label="Facebook">
              <img src="logos/facebook.png" alt="Facebook" className="w-6 h-6" /> 
            </a>
            <a href="#" aria-label="Twitter">
              <img src="logos/twitter.png" alt="Twitter" className="w-6 h-6" /> 
            </a>
            <a href="#" aria-label="Instagram">
              <img src="logos/instagram.png" alt="Instagram" className="w-6 h-6" /> 
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src="logos/linkedin.png" alt="LinkedIn" className="w-6 h-6" /> 
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}