import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const maintenanceLogs = [
  { id: 'm001', vehicle: 'Toyota Corolla (ABC-123)', type: 'Vidange', date: '2024-07-01', cost: '50.000 CDF', garage: 'Garage Central' },
  { id: 'm002', vehicle: 'Mercedes C-Class (DEF-456)', type: 'Changement de pneus', date: '2024-06-15', cost: '300.000 CDF', garage: 'Pneu Express' },
  { id: 'm003', vehicle: 'Hyundai Tucson (GHI-789)', type: 'Révision générale', date: '2024-05-20', cost: '150.000 CDF', garage: 'Garage AutoPlus' },
];

const OwnerMaintenance = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-futi-night-blue">Carnet d'entretien</h2>
        <Button className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">
          <PlusCircle className="h-4 w-4 mr-2" /> Ajouter un entretien
        </Button>
      </div>

      <Card className="shadow-md border-futi-accent/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Historique des entretiens</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Véhicule</TableHead>
                <TableHead className="text-futi-night-blue">Type d'entretien</TableHead>
                <TableHead className="text-futi-night-blue">Date</TableHead>
                <TableHead className="text-futi-night-blue">Coût</TableHead>
                <TableHead className="text-futi-night-blue">Garage</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenanceLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.vehicle}</TableCell>
                  <TableCell>{log.type}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{log.cost}</TableCell>
                  <TableCell>{log.garage}</TableCell>
                  <TableCell className="text-right">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerMaintenance;