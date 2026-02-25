'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Car, Loader2, Save, Image, MapPin, Tag, Briefcase, Plus } from 'lucide-react';

const vehicleSchema = z.object({
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  pricePerDay: z.coerce.number().positive("Le prix doit être positif"),
  type: z.enum(['SEDAN', 'SUV', 'HATCHBACK', 'PICKUP', 'VAN', 'MOTORCYCLE']),
  location: z.string().min(1, "La localisation est requise"),
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

export default function AddVehiclePage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Vérifier l'authentification au montage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      type: 'SEDAN',
      year: new Date().getFullYear(),
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/vehicles`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Une erreur est survenue lors de l'ajout");
      }

      router.push('/vehicles'); // Rediriger vers le catalogue
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-togo-dark leading-tight">
              Ajouter un <span className="text-togo-green">Véhicule</span>
            </h1>
            <p className="text-gray-500 mt-1">
              Remplissez les informations pour mettre votre véhicule en location.
            </p>
          </div>
          <div className="p-4 bg-togo-green/10 rounded-full">
            <Plus className="w-8 h-8 text-togo-green" />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100 mb-8 flex items-center gap-3">
             <div className="p-1 bg-red-100 rounded-full"><Loader2 className="w-4 h-4 rotate-45" /></div>
             {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag className="w-4 h-4 text-togo-green" /> Marque
                </label>
                <input
                  {...register('brand')}
                  placeholder="Ex: Toyota, Mercedes..."
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
                />
                {errors.brand && <p className="text-xs text-red-500 pl-2">{errors.brand.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-togo-yellow" /> Modèle
                </label>
                <input
                  {...register('model')}
                  placeholder="Ex: Corolla, G63..."
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
                />
                {errors.model && <p className="text-xs text-red-500 pl-2">{errors.model.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Année</label>
                <input
                  type="number"
                  {...register('year')}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
                />
                {errors.year && <p className="text-xs text-red-500 pl-2">{errors.year.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Type de véhicule</label>
                <select
                  {...register('type')}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all appearance-none"
                >
                  <option value="SEDAN">Berline</option>
                  <option value="SUV">SUV / 4x4</option>
                  <option value="HATCHBACK">Citadine</option>
                  <option value="PICKUP">Pick-up</option>
                  <option value="VAN">Van / Bus</option>
                  <option value="MOTORCYCLE">Moto</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Prix / Jour (FCFA)</label>
                <input
                  type="number"
                  {...register('pricePerDay')}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-black text-togo-green focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
                />
                {errors.pricePerDay && <p className="text-xs text-red-500 pl-2">{errors.pricePerDay.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-togo-red" /> Ville de stationnement
              </label>
              <input
                {...register('location')}
                placeholder="Ex: Lomé - Adidogomé"
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-togo-green/20 outline-none transition-all"
              />
              {errors.location && <p className="text-xs text-red-500 pl-2">{errors.location.message}</p>}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 text-gray-400">
               <div className="p-4 bg-gray-50 rounded-2xl"><Image className="w-8 h-8" /></div>
               <p className="text-sm">La gestion des photos sera disponible dans la prochaine mise à jour.</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-togo-dark text-white font-black py-5 px-6 rounded-3xl hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                Mettre mon véhicule en ligne <Save className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
