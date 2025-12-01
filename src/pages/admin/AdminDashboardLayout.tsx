import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Users, Car, Calendar, DollarSign, BarChart2, BellRing, Settings, LogOut, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
// import { supabase } from '@/integrations/supabase/client'; // No longer needed for custom admin logout
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';

const AdminDashboardLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    { name: "Tableau de bord", path: "/admin/dashboard", icon: <BarChart2 className="h-5 w-5" /> },
    { name: "Gestion Propriétaires", path: "/admin/dashboard/owners", icon: <Users className="h-5 w-5" /> },
    { name: "Gestion Chauffeurs", path: "/admin/dashboard/drivers", icon: <UserCog className="h-5 w-5" /> },
    { name: "Suivi Véhicules", path: "/admin/dashboard/vehicles", icon: <Car className="h-5 w-5" /> },
    { name: "Planning Général", path: "/admin/dashboard/planning", icon: <Calendar className="h-5 w-5" /> },
    { name: "Recettes & Dépenses", path: "/admin/dashboard/finance", icon: <DollarSign className="h-5 w-5" /> },
    { name: "Notifications", path: "/admin/dashboard/notifications", icon: <BellRing className="h-5 w-5" /> },
  ];

  const handleLogout = async () => {
    const toastId = showLoading("Déconnexion Admin en cours...");
    try {
      localStorage.removeItem('isAdminLoggedIn'); // Clear the admin login flag
      showSuccess("Vous avez été déconnecté de l'administration.");
      navigate('/admin'); // Redirect to the custom admin login page
    } catch (error: any) {
      showError("Une erreur est survenue lors de la déconnexion.");
    } finally {
      dismissToast(toastId);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-futi-night-blue text-futi-white p-6 shadow-lg">
        <div className="text-2xl font-bold mb-8">
          <span className="text-futi-white">Futi</span><span className="text-futi-accent">Coop</span> <span className="text-futi-white">Admin</span>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-md text-futi-white hover:bg-futi-accent hover:text-futi-night-blue transition-colors duration-200"
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <Separator className="my-6 bg-futi-accent/30" />
        <div className="space-y-2">
          <Link
            to="/admin/dashboard/settings"
            className="flex items-center space-x-3 p-3 rounded-md text-futi-white hover:bg-futi-accent hover:text-futi-night-blue transition-colors duration-200"
          >
            <Settings className="h-5 w-5" />
            <span>Paramètres</span>
          </Link>
          <Button
            variant="ghost"
            className="w-full flex justify-start items-center space-x-3 p-3 text-futi-white hover:bg-futi-accent hover:text-futi-night-blue transition-colors duration-200"
            onClick={handleLogout}
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
            {/* Avatar ou menu admin */}
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