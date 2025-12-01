import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

const drivers = [
  { id: 'd001', name: 'Jean-Luc', phone: '+243 811 223 344', status: 'Actif', assignedVehicle: 'Toyota Corolla (ABC-123)' },
  { id: 'd002', name: 'Marie-Claire', phone: '+243 822 334 455', status: 'Actif', assignedVehicle: 'Mercedes C-Class (DEF-456)' },
  { id: 'd003', name: 'Paul Dupont', phone: '+243 833 445 566', status: 'Inactif', assignedVehicle: 'Aucun' },
];

const AdminDrivers = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/chauffeur-de-taxi-feminin-pretant-attention-a-la-route.jpg')" }}
      ></div>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gray-900 opacity-5"></div>

      <div className="relative z-10 p-6 space-y-6 flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-futi-night-blue">Gestion des Chauffeurs</h2>
          <Button className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">
            <PlusCircle className="h-4 w-4 mr-2" /> Ajouter un chauffeur
          </Button>
        </div>

        <Card className="shadow-md border-futi-accent/20">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-futi-night-blue">Liste des chauffeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-futi-night-blue">Nom</TableHead>
                  <TableHead className="text-futi-night-blue">Téléphone</TableHead>
                  <TableHead className="text-futi-night-blue">Statut</TableHead>
                  <TableHead className="text-futi-night-blue">Véhicule affecté</TableHead>
                  <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.phone}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        driver.status === 'Actif' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {driver.status}
                      </span>
                    </TableCell>
                    <TableCell>{driver.assignedVehicle}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-futi-night-blue hover:bg-futi-accent/10 mr-2">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-futi-night-blue hover:bg-futi-accent/10 mr-2">
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
          </Table>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default AdminDrivers;