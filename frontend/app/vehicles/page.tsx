'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Search, Filter, MapPin, Calendar, CheckCircle, Info, Loader2 } from 'lucide-react';

const VEHICLE_TYPES = [
  { id: 'ALL', label: 'Tous' },
  { id: 'SEDAN', label: 'Berline' },
  { id: 'SUV', label: 'SUV' },
  { id: 'HATCHBACK', label: 'Citadine' },
  { id: 'PICKUP', label: 'Pick-up' },
  { id: 'VAN', label: 'Van' },
  { id: 'MOTORCYCLE', label: 'Moto' },
];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/vehicles`);
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des véhicules:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((v: any) => {
    const matchesFilter = filter === 'ALL' || v.type === filter;
    const matchesSearch = v.brand.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header de la page */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-togo-dark mb-2">
            Notre <span className="text-togo-green">Flotte</span> Premium
          </h1>
          <p className="text-gray-500 max-w-2xl">
            Trouvez le véhicule idéal pour vos déplacements à Lomé, Kara ou partout au Togo.
          </p>
        </div>

        {/* Barre de Recherche et Filtres */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une marque ou un modèle..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-togo-green/20 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {VEHICLE_TYPES.map((t) => (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap text-sm ${
                  filter === t.id 
                    ? 'bg-togo-green text-white shadow-lg shadow-togo-green/20' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des Véhicules */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-12 h-12 text-togo-green animate-spin" />
            <p className="font-bold text-gray-400">Chargement de la flotte...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredVehicles.length > 0 ? (
                filteredVehicles.map((vehicle, index) => (
                  <motion.div
                    key={vehicle.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
                  >
                    {/* Placeholder Image (Bientôt remplacée par les vraies images) */}
                    <div className="aspect-[16/10] bg-gray-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <Car className="w-20 h-20 opacity-20 group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-togo-dark shadow-sm uppercase tracking-tighter">
                          {vehicle.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-grow flex-col">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-black text-togo-dark leading-tight">
                            {vehicle.brand} {vehicle.model}
                          </h3>
                          <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                             <MapPin className="w-3 h-3 text-togo-red" /> {vehicle.location || 'Lomé, Togo'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="block text-xl font-black text-togo-green leading-none">
                            {vehicle.pricePerDay.toLocaleString()} FCFA
                          </span>
                          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                            Par jour
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mb-6 text-xs text-gray-500 font-medium">
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                          <CheckCircle className="w-3 h-3 text-togo-green" /> Assurance incluse
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl">
                          <Calendar className="w-3 h-3 text-togo-yellow" /> Année {vehicle.year}
                        </div>
                      </div>

                      <div className="mt-auto flex gap-2">
                        <Link 
                          href={`/vehicles/${vehicle.id}`}
                          className="flex-grow bg-togo-dark text-white text-center py-3.5 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-md active:scale-95"
                        >
                          Réserver maintenant
                        </Link>
                        <button className="p-3.5 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors">
                          <Info className="w-5 h-5 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="bg-white inline-block p-10 rounded-full mb-6">
                    <Car className="w-16 h-16 text-gray-200" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
                  <p className="text-gray-500">Essayez d'ajuster vos filtres ou votre recherche.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
