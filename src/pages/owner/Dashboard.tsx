import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Car, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OwnerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-futi-night-blue">Tableau de bord Propriétaire</h2>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-md border-futi-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Recettes Journalières</CardTitle>
            <DollarSign className="h-4 w-4 text-futi-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">500.000 CDF</div>
            <p className="text-xs text-gray-500">+10% par rapport à hier</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Recettes Mensuelles</CardTitle>
            <DollarSign className="h-4 w-4 text-futi-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">15.000.000 CDF</div>
            <p className="text-xs text-gray-500">+5% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-accent/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-futi-night-blue">Véhicules Actifs</CardTitle>
            <Car className="h-4 w-4 text-futi-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-futi-night-blue">3</div>
            <p className="text-xs text-gray-500">Sur 3 véhicules enregistrés</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions / Key Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md border-futi-accent/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-futi-night-blue">Carnet d'entretien</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">Prochain entretien pour "Toyota Corolla" le 15/10/2024.</p>
            <Button variant="outline" className="text-futi-night-blue border-futi-accent hover:bg-futi-accent/10">Voir le carnet complet</Button>
          </CardContent>
        </Card>
        <Card className="shadow-md border-futi-accent/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-futi-night-blue">Planning du chauffeur</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">Chauffeur Jean-Luc affecté à "Mercedes C-Class" aujourd'hui.</p>
            <Button variant="outline" className="text-futi-night-blue border-futi-accent hover:bg-futi-accent/10">Consulter le planning</Button>
          </CardContent>
        </Card>
      </div>

      {/* Download Reports */}
      <Card className="shadow-md border-futi-accent/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Rapports & Documents</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-gray-700">Téléchargez vos rapports financiers et documents importants.</p>
          <Button className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">
            <FileText className="h-4 w-4 mr-2" /> Télécharger Rapport PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerDashboard;