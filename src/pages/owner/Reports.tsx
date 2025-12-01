import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText } from 'lucide-react';

const OwnerReports = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-futi-night-blue">Rapports & Traçabilité</h2>

      <Card className="shadow-md border-futi-orange/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Générer un rapport PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="report-type" className="block text-sm font-medium text-gray-700 mb-1">Type de rapport</label>
              <Select>
                <SelectTrigger id="report-type" className="w-full border-futi-orange/30 focus:ring-futi-orange focus:border-futi-orange">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly-finance">Rapport financier mensuel</SelectItem>
                  <SelectItem value="annual-summary">Résumé annuel</SelectItem>
                  <SelectItem value="maintenance-history">Historique d'entretien</SelectItem>
                  <SelectItem value="driver-performance">Performance chauffeur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="report-period" className="block text-sm font-medium text-gray-700 mb-1">Période</label>
              <Select>
                <SelectTrigger id="report-period" className="w-full border-futi-orange/30 focus:ring-futi-orange focus:border-futi-orange">
                  <SelectValue placeholder="Sélectionner une période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current-month">Mois en cours</SelectItem>
                  <SelectItem value="last-month">Mois dernier</SelectItem>
                  <SelectItem value="last-quarter">Dernier trimestre</SelectItem>
                  <SelectItem value="current-year">Année en cours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full bg-futi-orange text-futi-night-blue hover:bg-futi-orange/90">
            <Download className="h-4 w-4 mr-2" /> Télécharger le rapport
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md border-futi-orange/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Documents Téléchargeables</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-futi-night-blue" />
              <span>Contrat de service FutiCoop.pdf</span>
            </div>
            <Button variant="outline" size="sm" className="text-futi-night-blue border-futi-orange hover:bg-futi-orange/10">
              Télécharger
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md bg-gray-50">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-futi-night-blue" />
              <span>Facture Janvier 2024.pdf</span>
            </div>
            <Button variant="outline" size="sm" className="text-futi-night-blue border-futi-orange hover:bg-futi-orange/10">
              Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerReports;