import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Car, DollarSign, Wrench, Calendar, FileText, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const OwnerDashboardLayout = () => {
  const navItems = [
    { name: "Tableau de bord", path: "/owner/dashboard", icon: <DollarSign className="h-5 w-5" /> },
    { name: "Mes Véhicules", path: "/owner/dashboard/vehicles", icon: <Car className="h-5 w-5" /> },
    { name: "Carnet d'entretien", path: "/owner/dashboard/maintenance", icon: <Wrench className="h-5 w-5" /> },
    { name: "Planning Chauffeur", path: "/owner/dashboard/planning", icon: <Calendar className="h-5 w-5" /> },
    { name: "Rapports", path: "/owner/dashboard/reports", icon: <FileText className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-futi-night-blue text-futi-white p-6 shadow-lg">
        <div className="text-2xl font-bold text-futi-orange mb-8">FutiCoop</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-md text-futi-white hover:bg-futi-orange hover:text-futi-night-blue transition-colors duration-200"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <Separator className="my-6 bg-futi-orange/30" />
        <div className="space-y-2">
          <Link
            to="/owner/dashboard/settings"
            className="flex items-center space-x-3 p-3 rounded-md text-futi-white hover:bg-futi-orange hover:text-futi-night-blue transition-colors duration-200"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-3 p-3 text-futi-white hover:bg-futi-orange hover:text-futi-night-blue transition-colors duration-200"
            onClick={() => console.log("Déconnexion")} // Placeholder for logout logic
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-futi-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-futi-night-blue">Espace Propriétaire</h1>
          {/* User profile/notifications can go here */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Bienvenue, Propriétaire !</span>
            {/* Avatar or user menu */}
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* Renders the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboardLayout;