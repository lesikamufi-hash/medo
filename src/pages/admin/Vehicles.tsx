import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

const vehicles = [
  { id: 'v001', owner: 'Jean Dupont', brand: 'Toyota', model: 'Corolla', plate: 'ABC-123', status: 'Actif', entryDate: '2023-01-15' },
  { id: 'v002', owner: 'Marie Curie', brand: 'Mercedes', model: 'C-Class', plate: 'DEF-456', status: 'Actif', entryDate: '2023-03-20' },
  { id: 'v003', owner: 'Pierre Martin', brand: 'Hyundai', model: 'Tucson', plate: 'GHI-789', status: 'En maintenance', entryDate: '2023-06-10' },
];

const AdminVehicles = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-futi-night-blue">Suivi des Véhicules</h2>
        <Button className="bg-futi-gold text-futi-night-blue hover:bg-futi-gold/90">
          <PlusCircle className="h-4 w-4 mr-2" /> Ajouter un véhicule
        </Button>
      </div>

      <Card className="shadow-md border-futi-gold/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Liste des véhicules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Propriétaire</TableHead>
                <TableHead className="text-futi-night-blue">Marque</TableHead>
                <TableHead className="text-futi-night-blue">Modèle</TableHead>
                <TableHead className="text-futi-night-blue">Plaque</TableHead>
                <TableHead className="text-futi-night-blue">Statut</TableHead>
                <TableHead className="text-futi-night-blue">Date d'entrée</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id}>
                  <TableCell className="font-medium">{vehicle.owner}</TableCell>
                  <TableCell>{vehicle.brand}</TableCell>
                  <TableCell>{vehicle.model}</TableCell>
                  <TableCell>{vehicle.plate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      vehicle.status === 'Actif' ? 'bg-green-100 text-green-800' :
                      vehicle.status === 'En maintenance' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {vehicle.status}
                    </span>
                  </TableCell>
                  <TableCell>{vehicle.entryDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-futi-night-blue hover:bg-futi-gold/10 mr-2">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-futi-night-blue hover:bg-futi-gold/10 mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminVehicles;