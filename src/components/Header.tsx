import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-futi-night-blue text-futi-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-futi-white">Futi</span><span className="text-futi-orange">Coop</span>
        </Link>

        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-futi-orange transition-colors">Accueil</Link>
          <Link to="/about" className="hover:text-futi-orange transition-colors">À propos</Link>
          <Link to="/services" className="hover:text-futi-orange transition-colors">Services</Link>
          <Link to="/contact" className="hover:text-futi-orange transition-colors">Contact</Link>
          <Link to="/owner/login">
            <Button variant="outline" className="bg-futi-orange text-futi-night-blue hover:bg-futi-orange/90 hover:text-futi-night-blue border-futi-orange">
              Espace Propriétaire
            </Button>
          </Link>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-futi-white hover:bg-futi-orange/20">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-futi-night-blue text-futi-white border-futi-orange">
              <nav className="flex flex-col space-y-4 mt-8">
                <Link to="/" className="text-lg hover:text-futi-orange transition-colors" onClick={() => document.getElementById('sheet-close')?.click()}>Accueil</Link>
                <Link to="/about" className="text-lg hover:text-futi-orange transition-colors" onClick={() => document.getElementById('sheet-close')?.click()}>À propos</Link>
                <Link to="/services" className="text-lg hover:text-futi-orange transition-colors" onClick={() => document.getElementById('sheet-close')?.click()}>Services</Link>
                <Link to="/contact" className="text-lg hover:text-futi-orange transition-colors" onClick={() => document.getElementById('sheet-close')?.click()}>Contact</Link>
                <Link to="/owner/login">
                  <Button className="w-full bg-futi-orange text-futi-night-blue hover:bg-futi-orange/90 hover:text-futi-night-blue border-futi-orange" onClick={() => document.getElementById('sheet-close')?.click()}>
                    Espace Propriétaire
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;