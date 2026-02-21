// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} TogoDrive. Tous droits réservés.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400">Politique de confidentialité</a>
          <a href="#" className="hover:text-blue-400">Conditions d'utilisation</a>
        </div>
      </div>
    </footer>
  );
}
