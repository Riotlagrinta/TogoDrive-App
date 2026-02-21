import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4 pt-16">
      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: "url('https://picsum.photos/seed/togodrive/1600/900')" }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Votre liberté de mouvement au Togo
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Louez ou achetez le véhicule parfait pour vos besoins.
          </p>
          <Link href="/vehicles" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
            Explorer les véhicules
          </Link>
        </div>
      </section>

      {/* Search Bar Section (Mobile-First) */}
      <section className="w-full max-w-md mx-auto -mt-12 z-20 bg-white shadow-lg rounded-lg p-6 md:p-8">
  );
}
