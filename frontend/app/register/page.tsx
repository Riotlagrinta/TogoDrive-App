'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Car, User, Mail, Lock, Phone, ArrowRight, Loader2, MapPin, Briefcase } from 'lucide-react';

const registerSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  password: z.string().min(6, "Au moins 6 caractères"),
  role: z.enum(['CLIENT', 'PARTNER']),
  warehouseLocation: z.string().optional(),
}).refine((data) => {
  if (data.role === 'PARTNER' && !data.warehouseLocation) {
    return false;
  }
  return true;
}, {
  message: "La localisation de l'entrepôt est requise pour les partenaires",
  path: ["warehouseLocation"],
});

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'CLIENT' | 'PARTNER'>('CLIENT');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'CLIENT'
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Une erreur est survenue lors de l'inscription");
      }

      if (data.role === 'PARTNER') {
        alert("Inscription réussie ! Votre compte est en attente de validation. L'administrateur vous contactera pour visiter votre entrepôt.");
        router.push('/login');
      } else {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-gray-100">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-3xl font-black text-togo-dark mb-4">
            <Car className="w-10 h-10 text-togo-green" />
            <span>Togo<span className="text-togo-green">Drive</span></span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Créez votre compte</h2>
          <p className="mt-2 text-sm text-gray-600">Rejoignez la révolution de la mobilité au Togo.</p>
        </div>

        {/* Choix du rôle */}
        <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => setSelectedRole('CLIENT')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${selectedRole === 'CLIENT' ? 'bg-white text-togo-green shadow-sm' : 'text-gray-500'}`}
          >
            Je veux louer
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('PARTNER')}
            className={`flex-1 py-3 rounded-xl text-sm font-black transition-all ${selectedRole === 'PARTNER' ? 'bg-white text-togo-green shadow-sm' : 'text-gray-500'}`}
          >
            Je suis propriétaire
          </button>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('role')} value={selectedRole} />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Prénom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register('firstName')} type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-togo-green" placeholder="Jean" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nom</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input {...register('lastName')} type="text" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-togo-green" placeholder="Kpogho" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email professionnel</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input {...register('email')} type="email" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-togo-green" placeholder="jean@example.com" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Téléphone (WhatsApp)</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input {...register('phone')} type="tel" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-togo-green" placeholder="+228 90 00 00 00" />
            </div>
          </div>

          {selectedRole === 'PARTNER' && (
            <div className="space-y-1 animate-in slide-in-from-top-2">
              <label className="text-xs font-bold text-togo-red uppercase tracking-wider">Localisation de l'entrepôt</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-togo-red" />
                <input {...register('warehouseLocation')} type="text" className="w-full pl-10 pr-4 py-3 bg-red-50 border border-red-100 rounded-xl outline-none focus:border-togo-red" placeholder="Ex: Lomé, Quartier Adidogomé, Face à l'école X" />
              </div>
              {errors.warehouseLocation && <p className="text-xs text-red-500">{errors.warehouseLocation.message as string}</p>}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input {...register('password')} type="password" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-togo-green" placeholder="••••••••" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-togo-dark text-white font-black py-4 rounded-xl hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>S'inscrire <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>
      </div>
    </div>
  );
}
