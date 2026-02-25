'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Car, MapPin, Calendar, CreditCard, CheckCircle, Loader2, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/vehicles`);
        const data = await response.json();
        const found = data.find((v) => v.id === id);
        setVehicle(found);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/bookings`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          vehicleId: id,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Erreur lors de la réservation");

      alert("Réservation effectuée avec succès !");
      router.push('/dashboard/bookings');
    } catch (err) {
      setError(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  // Calcul du prix total
  const calculateTotal = () => {
    if (!startDate || !endDate || !vehicle) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil(Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) || 1;
    return diff * vehicle.pricePerDay;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-togo-green" /></div>;
  if (!vehicle) return <div className="min-h-screen flex flex-col items-center justify-center gap-4"><p>Véhicule non trouvé</p><Link href="/vehicles" className="text-togo-green underline">Retourner au catalogue</Link></div>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/vehicles" className="inline-flex items-center gap-2 text-gray-500 hover:text-togo-dark mb-8 font-bold transition-colors">
          <ArrowLeft className="w-5 h-5" /> Retour au catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Détails du Véhicule (Colonne Gauche) */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                 <Car className="w-32 h-32 text-gray-200" />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-togo-green/10 text-togo-green rounded-full text-[10px] font-black uppercase mb-3 inline-block">
                      {vehicle.type}
                    </span>
                    <h1 className="text-4xl font-black text-togo-dark leading-tight">
                      {vehicle.brand} {vehicle.model}
                    </h1>
                    <p className="text-gray-400 flex items-center gap-2 mt-2">
                      <MapPin className="w-4 h-4 text-togo-red" /> {vehicle.location || 'Lomé, Togo'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-y border-gray-50">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Année</p>
                    <p className="font-black text-togo-dark">{vehicle.year}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">État</p>
                    <p className="font-black text-togo-green">Excellent</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Passagers</p>
                    <p className="font-black text-togo-dark">5 Places</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">Carburant</p>
                    <p className="font-black text-togo-dark">Essence</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-black text-togo-dark mb-4 uppercase tracking-wider">Description</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Ce {vehicle.brand} {vehicle.model} de l'année {vehicle.year} est le véhicule parfait pour vos déplacements professionnels ou familiaux au Togo. Profitez d'un confort optimal, d'une climatisation performante et d'une sécurité maximale pour toutes vos routes.
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-togo-dark p-6 rounded-3xl text-white">
                <ShieldCheck className="w-10 h-10 text-togo-green mb-4" />
                <h4 className="font-black text-lg mb-2">Protection complète</h4>
                <p className="text-gray-400 text-sm">Votre location inclut une assurance tous risques pour votre sérénité sur toutes les routes togolaises.</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <Zap className="w-10 h-10 text-togo-yellow mb-4" />
                <h4 className="font-black text-lg mb-2 text-togo-dark">Confirmation Rapide</h4>
                <p className="text-gray-500 text-sm">Recevez une réponse du propriétaire en moins d'une heure après votre demande.</p>
              </div>
            </div>
          </div>

          {/* Formulaire de Réservation (Colonne Droite) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Prix de base</p>
                  <p className="text-3xl font-black text-togo-green">{vehicle.pricePerDay.toLocaleString()} FCFA</p>
                </div>
                <p className="text-sm font-bold text-gray-400">/ jour</p>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-togo-green" /> Date de départ
                    </label>
                    <input 
                      type="date" 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <Calendar className="w-3 h-3 text-togo-red" /> Date de retour
                    </label>
                    <input 
                      type="date" 
                      required
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl space-y-3">
                  <div className="flex justify-between text-sm text-gray-500 font-medium">
                    <span>Location ({calculateTotal() / vehicle.pricePerDay} jours)</span>
                    <span>{calculateTotal().toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500 font-medium pb-2 border-b border-gray-200">
                    <span>Frais de service (5%)</span>
                    <span>{(calculateTotal() * 0.05).toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-togo-dark">Montant Total</span>
                    <span className="text-xl font-black text-togo-dark">{(calculateTotal() * 1.05).toLocaleString()} FCFA</span>
                  </div>
                </div>

                {error && <p className="text-xs text-red-500 text-center font-bold">{error}</p>}

                <button
                  type="submit"
                  disabled={bookingLoading || !startDate || !endDate}
                  className="w-full bg-togo-green text-white font-black py-5 px-6 rounded-2xl hover:bg-opacity-90 transition-all shadow-lg shadow-togo-green/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {bookingLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                    <>
                      Confirmer la réservation <CreditCard className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                <CheckCircle className="w-3 h-3 text-togo-green" /> Paiement à la livraison disponible
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
