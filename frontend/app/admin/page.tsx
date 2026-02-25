'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Car, 
  CalendarCheck, 
  TrendingUp, 
  ShieldAlert,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    vehicles: 0,
    bookings: 0,
    revenue: 0
  });
  const router = useRouter();

  useEffect(() => {
    // Sécurisation côté client
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    // Simulation de récupération de stats globales (à lier à une route API Admin plus tard)
    setTimeout(() => {
      setStats({
        users: 124,
        vehicles: 45,
        bookings: 89,
        revenue: 2450000
      });
      setLoading(false);
    }, 1000);
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-togo-green" /></div>;

  const cards = [
    { label: 'Utilisateurs', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
    { label: 'Véhicules', value: stats.vehicles, icon: Car, color: 'text-togo-green', bg: 'bg-togo-green/10', trend: '+5%' },
    { label: 'Réservations', value: stats.bookings, icon: CalendarCheck, color: 'text-togo-yellow', bg: 'bg-togo-yellow/10', trend: '+18%' },
    { label: 'Chiffre d'Affaires', value: `${stats.revenue.toLocaleString()} FCFA`, icon: TrendingUp, color: 'text-togo-red', bg: 'bg-togo-red/10', trend: '+22%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
              Panel Super-Admin
            </span>
            <h1 className="text-3xl font-black text-togo-dark leading-tight">
              Tableau de Bord <span className="text-togo-red">Global</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Gestion centralisée de la plateforme TogoDrive.
            </p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Rechercher..." 
                  className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-togo-red/20 outline-none"
                />
             </div>
             <button className="p-2 bg-white rounded-xl border border-gray-100 shadow-sm relative">
                <ShieldAlert className="w-5 h-5 text-red-500" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {cards.map((card, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${card.bg}`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <span className={`flex items-center text-xs font-black ${card.trend.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {card.trend} {card.trend.includes('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
              <p className="text-2xl font-black text-togo-dark">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Section de gestion (Placeholders) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-togo-dark mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" /> Derniers Utilisateurs
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-bold text-togo-dark">Utilisateur #{i+1}</p>
                      <p className="text-xs text-gray-400 font-medium">client@example.com</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:underline">Gérer</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
             <h3 className="text-xl font-black text-togo-dark mb-6 flex items-center gap-2">
              <Car className="w-5 h-5 text-togo-green" /> Véhicules à valider
            </h3>
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-green-50 p-4 rounded-full mb-4 text-togo-green">
                <Car className="w-8 h-8" />
              </div>
              <p className="font-bold text-togo-dark">Tout est à jour !</p>
              <p className="text-sm text-gray-400">Aucun véhicule en attente de validation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
