'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe, Users, Car, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { label: 'Villes couvertes', value: '10+' },
    { label: 'Véhicules disponibles', value: '500+' },
    { label: 'Utilisateurs satisfaits', value: '2k+' },
    { label: 'Partenaires locaux', value: '50+' },
  ];

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      {/* Hero Section À propos */}
      <section className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="px-4 py-1.5 bg-togo-green/10 text-togo-green rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
            Notre Mission
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-togo-dark mb-6 leading-tight">
            Digitaliser la route <br />
            <span className="text-togo-green">pour tout le Togo.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            TogoDrive est bien plus qu'une plateforme de location. Nous sommes le guichet unique qui connecte les Togolais et les visiteurs aux meilleurs loueurs et vendeurs de véhicules du pays.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="bg-togo-dark py-16 my-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-black text-togo-green mb-2">{stat.value}</p>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-togo-green/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-togo-green" />
            </div>
            <h3 className="text-2xl font-black text-togo-dark">Confiance & Sécurité</h3>
            <p className="text-gray-500 leading-relaxed">
              Tous nos partenaires sont certifiés. Nous vérifions chaque véhicule pour vous garantir une expérience sans mauvaise surprise.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-togo-yellow/10 rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-togo-yellow" />
            </div>
            <h3 className="text-2xl font-black text-togo-dark">Rapidité Digitale</h3>
            <p className="text-gray-500 leading-relaxed">
              Oubliez les appels interminables. Réservez votre véhicule en 3 clics et payez via T-Money ou Flooz instantanément.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 bg-togo-red/10 rounded-2xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-togo-red" />
            </div>
            <h3 className="text-2xl font-black text-togo-dark">Impact Local</h3>
            <p className="text-gray-500 leading-relaxed">
              Nous soutenons l'économie locale en offrant une visibilité digitale aux entrepreneurs togolais du secteur automobile.
            </p>
          </div>
        </div>
      </section>

      {/* L'équipe / Vision */}
      <section className="container mx-auto px-4 py-20 bg-gray-50 rounded-[40px] mb-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="aspect-square bg-gray-200 rounded-3xl overflow-hidden relative">
               <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                  <Users className="w-32 h-32" />
               </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-black text-togo-dark leading-tight">
              Une vision portée par <br />
              <span className="text-togo-green">Kelvix Digital Agency.</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              TogoDrive est une initiative née de la volonté de moderniser les services de transport au Togo. Développée par l'agence Kelvix, notre plateforme vise à simplifier la vie des citoyens et à booster le tourisme local par la technologie.
            </p>
            <ul className="space-y-3">
              {[
                "Innovation constante",
                "Service client 24/7",
                "Transparence totale des prix",
                "Engagement pour la qualité"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-togo-dark text-sm">
                  <CheckCircle2 className="w-5 h-5 text-togo-green" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-togo-green p-12 rounded-[40px] shadow-2xl shadow-togo-green/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Car className="w-64 h-64 text-white -rotate-12" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Prêt à prendre la route ?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/vehicles" className="bg-white text-togo-green px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">
                Explorer les véhicules <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/register" className="bg-togo-dark text-white px-8 py-4 rounded-2xl font-black hover:bg-black transition-all">
                Devenir partenaire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
