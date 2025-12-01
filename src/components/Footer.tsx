import React from 'react';
// import { MadeWithDyad } from './made-with-dyad'; // Removed import

const Footer = () => {
  return (
    <footer className="bg-futi-night-blue text-futi-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold text-futi-accent mb-2">FutiCoop</p>
        <p className="text-sm mb-4">Sécurité — Rentabilité — Confiance</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} FutiCoop. Tous droits réservés.</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">HermesX copyright</p> {/* Added HermesX copyright */}
      </div>
    </footer>
  );
};

export default Footer;