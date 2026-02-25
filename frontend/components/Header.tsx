// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Car } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        <Link href="/" className="flex items-center space-x-2 text-2xl font-black text-togo-dark group">
          <Car className="w-8 h-8 text-togo-green group-hover:text-togo-red transition-colors" />
          <span>Togo<span className="text-togo-green">Drive</span></span>
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link href="/vehicles" className="text-gray-600 hover:text-togo-green transition-colors">
            Véhicules
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-togo-green transition-colors">
            À propos
          </Link>
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
            <Link href="/login" className="text-togo-dark hover:text-togo-green transition-colors">
              Connexion
            </Link>
            <Link href="/register" className="bg-togo-green text-white px-6 py-2.5 rounded-full hover:bg-togo-green/90 shadow-md shadow-togo-green/20 transition-all font-semibold">
              S'inscrire
            </Link>
          </div>
        </div>

        {/* Bouton Mobile */}
        <div className="md:hidden flex items-center">
          <button 
            className="text-gray-600 hover:text-togo-dark p-2 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Menu Mobile Overlay */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link 
            href="/vehicles" 
            className="block text-lg font-medium text-gray-700 hover:text-togo-green"
            onClick={() => setIsMenuOpen(false)}
          >
            Véhicules
          </Link>
          <Link 
            href="/about" 
            className="block text-lg font-medium text-gray-700 hover:text-togo-green"
            onClick={() => setIsMenuOpen(false)}
          >
            À propos
          </Link>
          <hr className="border-gray-100" />
          <div className="flex flex-col space-y-3">
            <Link 
              href="/login" 
              className="text-center py-3 text-togo-dark font-semibold border border-gray-200 rounded-xl"
              onClick={() => setIsMenuOpen(false)}
            >
              Connexion
            </Link>
            <Link 
              href="/register" 
              className="text-center py-3 bg-togo-green text-white font-semibold rounded-xl shadow-md shadow-togo-green/20"
              onClick={() => setIsMenuOpen(false)}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
