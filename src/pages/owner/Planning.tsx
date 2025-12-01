import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const driverPlanning = [
  { id: 'p001', driver: 'Jean-Luc', vehicle: 'Toyota Corolla (ABC-123)', date: '2024-08-01', shift: 'Jour (08h-17h)', status: 'Confirmé' },
  { id: 'p002', driver: 'Marie-Claire', vehicle: 'Mercedes C-Class (DEF-456)', date: '2024-08-01', shift: 'Nuit (18h-03h)', status: 'Confirmé' },
  { id: 'p003', driver: 'Jean-Luc', vehicle: 'Toyota Corolla (ABC-123)', date: '2024-08-02', shift: 'Jour (08h-17h)', status: 'En attente' },
];

const OwnerPlanning = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-futi-night-blue">Planning du Chauffeur</h2>
        <Button className="bg-futi-gold text-futi-night-blue hover:bg-futi-gold/90">
          <PlusCircle className="h-4 w-4 mr-2" /> Planifier un chauffeur
        </Button>
      </div>

      <Card className="shadow-md border-futi-gold/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Planning actuel</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Chauffeur</TableHead>
                <TableHead className="text-futi-night-blue">Véhicule</TableHead>
                <TableHead className="text-futi-night-blue">Date</TableHead>
                <TableHead className="text-futi-night-blue">Shift</TableHead>
                <TableHead className="text-futi-night-blue">Statut</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {driverPlanning.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.driver}</TableCell>
                  <TableCell>{plan.vehicle}</TableCell>
                  <TableCell>{plan.date}</TableCell>
                  <TableCell>{plan.shift}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      plan.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                      plan.status === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {plan.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
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

export default OwnerPlanning;