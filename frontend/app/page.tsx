'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen text-center pt-20">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-gray-900 overflow-hidden">
        {/* Abstract Background Elements representing Togo Colors */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-togo-green opacity-20 blur-[100px] rounded-full"></div>
          <div className="absolute top-0 right-1/4 w-1/3 h-1/2 bg-togo-yellow opacity-10 blur-[80px] rounded-full"></div>
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-full bg-togo-red opacity-10 blur-[100px] rounded-full"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl text-center"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
              L'élégance de la route, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-togo-green via-togo-yellow to-togo-red">
                partout au Togo.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Louez ou achetez des véhicules d'exception. Une expérience premium, fluide et sécurisée conçue pour votre liberté.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/vehicles" className="w-full sm:w-auto px-8 py-4 bg-togo-green text-white font-bold rounded-full hover:bg-opacity-90 transition-all shadow-lg shadow-togo-green/30 text-lg">
                Explorer notre flotte
              </Link>
              <Link href="/about" className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white backdrop-blur-md font-bold rounded-full hover:bg-white/20 transition-all text-lg border border-white/20">
                Comment ça marche ?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modern Search Engine */}
      <section className="w-full container mx-auto px-4 -mt-16 z-20 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border border-gray-100 max-w-5xl mx-auto"
        >
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-togo-green" /> Lieu de départ
              </label>
              <input
                type="text"
                placeholder="Ex: Lomé, Kara..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-togo-green/50 focus:border-togo-green transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-togo-yellow" /> Date de départ
              </label>
              <input
                type="date"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-togo-green/50 focus:border-togo-green transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-togo-red" /> Date de retour
              </label>
              <input
                type="date"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-togo-green/50 focus:border-togo-green transition-all"
              />
            </div>
            <div className="mt-4 md:mt-0">
              <button
                type="submit"
                className="w-full bg-togo-dark text-white font-bold py-3.5 px-6 rounded-xl hover:bg-black transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" /> Trouver
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
