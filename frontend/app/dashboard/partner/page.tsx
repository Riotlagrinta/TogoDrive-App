'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Car, 
  Plus, 
  Users, 
  TrendingUp, 
  Calendar, 
  MapPin, 
  Loader2, 
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PartnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [myVehicles, setMyVehicles] = useState([]);
  const [receivedBookings, setReceivedBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'PARTNER') {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // Récupérer mes véhicules
        const resVehicles = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/vehicles/my-vehicles`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMyVehicles(await resVehicles.json());

        // Simulation de réservations reçues (en attendant la route API)
        setReceivedBookings([
          { id: 1, user: { firstName: 'Mawuli', lastName: 'K.' }, vehicle: { brand: 'Toyota', model: 'Camry' }, totalAmount: 45000, status: 'PENDING', startDate: '2026-03-01' }
        ]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-togo-green" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 text-togo-dark">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="px-3 py-1 bg-togo-green/10 text-togo-green rounded-full text-[10px] font-black uppercase tracking-widest mb-2 inline-block">
              Espace Marchand
            </span>
            <h1 className="text-3xl font-black leading-tight">
              Gestion de votre <span className="text-togo-green">Parc Auto</span>
            </h1>
          </div>
          <Link href="/dashboard/add-vehicle" className="bg-togo-dark text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-black transition-all shadow-lg flex items-center gap-2">
            <Plus className="w-5 h-5" /> Ajouter un véhicule
          </Link>
        </div>

        {/* Stats Marchand */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-50 rounded-2xl text-blue-600"><Car className="w-6 h-6" /></div>
               <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mes Véhicules</p>
                 <p className="text-2xl font-black">{myVehicles.length}</p>
               </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-togo-green/10 rounded-2xl text-togo-green"><TrendingUp className="w-6 h-6" /></div>
               <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Revenus Estimés</p>
                 <p className="text-2xl font-black">750.000 FCFA</p>
               </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
               <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600"><Calendar className="w-6 h-6" /></div>
               <div>
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Réservations</p>
                 <p className="text-2xl font-black">{receivedBookings.length}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Liste des véhicules du marchand */}
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-togo-green" /> Ma Flotte
            </h3>
            {myVehicles.length === 0 ? (
              <div className="bg-white p-10 rounded-3xl border border-dashed border-gray-200 text-center">
                <p className="text-gray-400 font-bold">Vous n'avez pas encore de véhicule en ligne.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myVehicles.map((v: any) => (
                  <div key={v.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300">
                        <Car className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-togo-dark">{v.brand} {v.model}</p>
                        <p className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" /> {v.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-togo-green">{v.pricePerDay.toLocaleString()} FCFA</p>
                      <p className="text-[10px] text-gray-400 font-bold">Par jour</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Demandes de réservations reçues */}
          <div className="space-y-6">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Clock className="w-5 h-5 text-togo-yellow" /> Demandes Récentes
            </h3>
            {receivedBookings.map((b: any) => (
              <div key={b.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-togo-green/10 text-togo-green rounded-full flex items-center justify-center font-black">
                      {b.user.firstName[0]}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{b.user.firstName} {b.user.lastName}</p>
                      <p className="text-[10px] text-gray-400">souhaite louer votre {b.vehicle.brand}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-[10px] font-black rounded-lg uppercase">En attente</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                   <div>
                     <p className="text-[10px] text-gray-400 font-bold uppercase">Date</p>
                     <p className="font-bold text-xs">{b.startDate}</p>
                   </div>
                   <button className="bg-togo-green text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-opacity-90 transition-all">
                     Confirmer
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
