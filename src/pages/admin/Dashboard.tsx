import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Car, DollarSign, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-futi-night-blue">Tableau de bord Administrateur</h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-md border-futi-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Total Propriétaires</CardTitle>
            <Users className="h-4 w-4 text-futi-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">120</div>
            <p className="text-xs text-gray-500">+5 ce mois-ci</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Total Véhicules</CardTitle>
            <Car className="h-4 w-4 text-futi-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">250</div>
            <p className="text-xs text-gray-500">+12 nouveaux</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Recettes Totales (Mois)</CardTitle>
            <DollarSign className="h-4 w-4 text-futi-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">50.000.000 CDF</div>
            <p className="text-xs text-gray-500">+8% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-gold/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Dépenses Totales (Mois)</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" /> {/* Using TrendingUp for expenses, could be a different icon */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">12.000.000 CDF</div>
            <p className="text-xs text-gray-500">-2% par rapport au mois dernier</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities / Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-futi-gold/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-futi-night-blue">Statistiques des Recettes (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Graphique des recettes ici
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-gold/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-futi-night-blue">Activités Récentes (Placeholder)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li>- Nouveau propriétaire enregistré: John Doe (2 min ago)</li>
              <li>- Véhicule "Toyota Yaris" ajouté (1 hour ago)</li>
              <li>- Entretien planifié pour "Mercedes C-Class" (hier)</li>
              <li>- Rapport financier mensuel généré (il y a 3 jours)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;