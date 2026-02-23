// components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TogoDrive
        </Link>
        <div className="flex space-x-4">
          <Link href="/vehicles" className="text-gray-700 hover:text-blue-600">
            Véhicules
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Connexion
          </Link>
          <Link href="/register" className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">
            S&apos;inscrire
          </Link>
        </div>
      </nav>
    </header>
  );
}
