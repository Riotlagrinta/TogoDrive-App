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
  Search,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [pendingPartners, setPendingPartners] = useState<any[]>([]);
  const [stats, setStats] = useState({
    users: 0,
    vehicles: 0,
    bookings: 0,
    revenue: 0
  });
  const router = useRouter();

  const fetchPendingPartners = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/pending-partners`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setPendingPartners(data);
      }
    } catch (error) {
      console.error("Erreur partenaires:", error);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    const loadData = async () => {
      await fetchPendingPartners();
      // Simulation stats
      setStats({
        users: 145,
        vehicles: 52,
        bookings: 98,
        revenue: 2850000
      });
      setLoading(false);
    };

    loadData();
  }, [router]);

  const handleValidatePartner = async (userId: string, action: 'ACTIVE' | 'REJECTED') => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/admin/validate-partner`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, action })
      });

      if (response.ok) {
        setPendingPartners(prev => prev.filter(p => p.id !== userId));
        alert(`Partenaire ${action === 'ACTIVE' ? 'validé' : 'rejeté'} avec succès !`);
      }
    } catch (error) {
      alert("Erreur lors de la validation");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-togo-green" /></div>;

  const cards = [
    { label: 'Utilisateurs', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
    { label: 'Véhicules', value: stats.vehicles, icon: Car, color: 'text-togo-green', bg: 'bg-togo-green/10', trend: '+5%' },
    { label: 'Réservations', value: stats.bookings, icon: CalendarCheck, color: 'text-togo-yellow', bg: 'bg-togo-yellow/10', trend: '+18%' },
    { label: "Chiffre d'Affaires", value: `${stats.revenue.toLocaleString()} FCFA`, icon: TrendingUp, color: 'text-togo-red', bg: 'bg-togo-red/10', trend: '+22%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 text-togo-dark">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
              Panel Super-Admin
            </span>
            <h1 className="text-3xl font-black leading-tight">
              Tableau de Bord <span className="text-togo-red">Global</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              Pilotez l'activité et certifiez les nouveaux partenaires TogoDrive.
            </p>
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
              <p className="text-2xl font-black">{card.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Section Partenaires en Attente */}
          <div className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black flex items-center gap-3">
                <ShieldAlert className="w-6 h-6 text-togo-red" /> 
                Demandes de Partenariat <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-lg">{pendingPartners.length}</span>
              </h3>
            </div>

            {pendingPartners.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                 <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <CheckCircle className="w-10 h-10 text-togo-green" />
                 </div>
                 <p className="font-bold text-lg">Tout est à jour !</p>
                 <p className="text-gray-400">Aucun nouveau partenaire en attente de validation.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {pendingPartners.map((partner) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={partner.id}
                      className="p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:border-togo-red/20 transition-all group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-togo-dark rounded-2xl flex items-center justify-center text-white font-black text-xl">
                            {partner.firstName[0]}{partner.lastName[0]}
                          </div>
                          <div>
                            <p className="font-black text-lg">{partner.firstName} {partner.lastName}</p>
                            <p className="text-xs text-gray-500 font-bold uppercase">{partner.email}</p>
                          </div>
                        </div>
                        <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                          <Clock className="w-4 h-4" />
                        </div>
                      </div>

                      <div className="space-y-4 mb-8">
                        <div className="bg-white p-4 rounded-2xl border border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 text-togo-red" /> Localisation de l'entrepôt
                          </p>
                          <p className="text-sm font-bold text-togo-dark leading-relaxed">
                            {partner.warehouseLocation}
                          </p>
                          <button className="mt-3 text-[10px] font-black text-togo-red flex items-center gap-1 hover:underline">
                             VOIR SUR GOOGLE MAPS <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-3 text-xs text-gray-500 font-bold">
                           <CalendarCheck className="w-4 h-4" /> Inscrit le {new Date(partner.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => handleValidatePartner(partner.id, 'ACTIVE')}
                          className="py-3.5 bg-togo-green text-white rounded-2xl font-black text-xs shadow-lg shadow-togo-green/10 hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" /> Certifier
                        </button>
                        <button 
                          onClick={() => handleValidatePartner(partner.id, 'REJECTED')}
                          className="py-3.5 bg-white text-togo-red border border-red-100 rounded-2xl font-black text-xs hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" /> Rejeter
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
