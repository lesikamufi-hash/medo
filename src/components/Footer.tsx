import React from 'react';
import { MadeWithDyad } from './made-with-dyad';

const Footer = () => {
  return (
    <footer className="bg-futi-night-blue text-futi-white py-8 mt-12">
      <div className="container mx-auto text-center">
        <p className="text-lg font-bold text-futi-gold mb-2">FutiCoop</p>
        <p className="text-sm mb-4">Sécurité — Rentabilité — Confiance</p>
        <p className="text-sm">&copy; {new Date().getFullYear()} FutiCoop. Tous droits réservés.</p>
        <MadeWithDyad />
      </div>
    </footer>
  );
};

export default Footer;