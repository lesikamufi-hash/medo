import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Users, Car, Calendar, DollarSign, BarChart2, BellRing, Settings, LogOut, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

const AdminDashboardLayout = () => {
  const navItems = [
    { name: "Tableau de bord", path: "/admin/dashboard", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Gestion Propriétaires", path: "/admin/dashboard/owners", icon: <Users className="h-5 w-5" /> },
    { name: "Gestion Chauffeurs", path: "/admin/dashboard/drivers", icon: <UserCog className="h-5 w-5" /> },
    { name: "Suivi Véhicules", path: "/admin/dashboard/vehicles", icon: <Car className="h-5 w-5" /> },
    { name: "Planning Général", path: "/admin/dashboard/planning", icon: <Calendar className="h-5 w-5" /> },
    { name: "Recettes & Dépenses", path: "/admin/dashboard/finance", icon: <DollarSign className="h-5 w-5" /> },
    { name: "Notifications", path: "/admin/dashboard/notifications", icon: <BellRing className="h-5 w-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-futi-night-blue text-futi-white p-6 shadow-lg">
        <div className="text-2xl font-bold text-futi-gold mb-8">FutiCoop Admin</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-md text-futi-white hover:bg-futi-gold hover:text-futi-night-blue transition-colors duration-200"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <Separator className="my-6 bg-futi-gold/30" />
        <div className="space-y-2">
          <Link
            to="/admin/dashboard/settings"
            className="flex items-center space-x-3 p-3 rounded-md text-futi-white hover:bg-futi-gold hover:text-futi-night-blue transition-colors duration-200"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-3 p-3 text-futi-white hover:bg-futi-gold hover:text-futi-night-blue transition-colors duration-200"
            onClick={() => console.log("Déconnexion Admin")} // Placeholder for logout logic
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-futi-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-futi-night-blue">Back-Office Administration</h1>
          {/* Admin profile/notifications can go here */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Bienvenue, Admin !</span>
            {/* Avatar or admin menu */}
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* Renders the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;