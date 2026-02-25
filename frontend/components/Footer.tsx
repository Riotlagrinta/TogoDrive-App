// components/Footer.tsx
import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-togo-dark text-gray-300 py-12 border-t-4 border-togo-green">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-black text-white mb-4">
              Togo<span className="text-togo-green">Drive</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Votre partenaire de confiance pour la location et l'achat de véhicules partout au Togo. Rapide, sécurisé et transparent.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <h4 className="text-lg font-semibold text-white mb-2">Liens Utiles</h4>
            <Link href="/vehicles" className="hover:text-togo-yellow transition-colors w-fit">Nos Véhicules</Link>
            <Link href="/about" className="hover:text-togo-yellow transition-colors w-fit">À Propos</Link>
            <Link href="/contact" className="hover:text-togo-yellow transition-colors w-fit">Contact</Link>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-semibold text-white mb-2">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-togo-green transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-togo-yellow transition-colors text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-togo-red transition-colors text-white">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} TogoDrive. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
