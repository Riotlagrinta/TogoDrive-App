'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Car, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  MapPin,
  CreditCard
} from 'lucide-react';
import Link from 'next/link';

const STATUS_MAP = {
  PENDING: { label: 'En attente', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
  CONFIRMED: { label: 'Confirmée', color: 'text-togo-green', bg: 'bg-togo-green/10', icon: CheckCircle2 },
  COMPLETED: { label: 'Terminée', color: 'text-blue-600', bg: 'bg-blue-50', icon: CheckCircle2 },
  CANCELLED: { label: 'Annulée', color: 'text-red-600', bg: 'bg-red-50', icon: XCircle },
};

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings/my-bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-togo-green" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-togo-dark leading-tight">
              Mes <span className="text-togo-green">Réservations</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Suivez l'état de vos locations de véhicules.
            </p>
          </div>
          <Link href="/vehicles" className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm font-bold text-sm text-togo-green hover:bg-gray-50 transition-all flex items-center gap-2">
            Louer un autre véhicule <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car className="w-10 h-10 text-gray-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Aucune réservation pour le moment</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Vous n'avez pas encore réservé de véhicule. Découvrez notre flotte pour votre prochain voyage.
            </p>
            <Link href="/vehicles" className="inline-block bg-togo-dark text-white px-8 py-4 rounded-2xl font-black transition-all hover:bg-black shadow-lg shadow-gray-200">
              Explorer les véhicules
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => {
              const status = STATUS_MAP[booking.status] || STATUS_MAP.PENDING;
              const StatusIcon = status.icon;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={booking.id} 
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image/Icon Placeholder */}
                    <div className="w-full md:w-48 bg-gray-50 flex items-center justify-center p-8 border-r border-gray-50">
                      <Car className="w-16 h-16 text-gray-200" />
                    </div>

                    <div className="p-6 md:p-8 flex-grow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-xl font-black text-togo-dark">
                              {booking.vehicle.brand} {booking.vehicle.model}
                            </h3>
                            <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${status.bg} ${status.color}`}>
                              <StatusIcon className="w-3 h-3" /> {status.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-togo-red" /> {booking.vehicle.location || 'Lomé, Togo'}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Total payé</p>
                          <p className="text-2xl font-black text-togo-green">
                            {booking.totalAmount.toLocaleString()} FCFA
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-50 rounded-2xl">
                            <Calendar className="w-5 h-5 text-togo-green" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Départ</p>
                            <p className="font-bold text-togo-dark">{new Date(booking.startDate).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-50 rounded-2xl">
                            <Calendar className="w-5 h-5 text-togo-red" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Retour</p>
                            <p className="font-bold text-togo-dark">{new Date(booking.endDate).toLocaleDateString('fr-FR')}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-gray-50 rounded-2xl">
                            <CreditCard className="w-5 h-5 text-togo-yellow" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Paiement</p>
                            <p className="font-bold text-togo-dark italic">À la livraison</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-12 p-6 bg-togo-green/5 rounded-3xl border border-togo-green/10 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-togo-green shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-togo-dark">Besoin d'aide ?</h4>
            <p className="text-sm text-gray-600 mt-1">
              Si vous souhaitez modifier ou annuler une réservation confirmée, veuillez contacter le propriétaire directement ou notre support client au +228 90 00 00 00.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
