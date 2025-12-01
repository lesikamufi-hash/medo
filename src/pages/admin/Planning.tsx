import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const generalPlanning = [
  { id: 'gp001', driver: 'Jean-Luc', vehicle: 'Toyota Corolla (ABC-123)', date: '2024-08-01', shift: 'Jour', owner: 'Jean Dupont' },
  { id: 'gp002', driver: 'Marie-Claire', vehicle: 'Mercedes C-Class (DEF-456)', date: '2024-08-01', shift: 'Nuit', owner: 'Marie Curie' },
  { id: 'gp003', driver: 'Paul Dupont', vehicle: 'Hyundai Tucson (GHI-789)', date: '2024-08-02', shift: 'Jour', owner: 'Pierre Martin' },
];

const AdminPlanning = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-futi-night-blue">Planning Général</h2>
        <Button className="bg-futi-orange text-futi-night-blue hover:bg-futi-orange/90">
          <PlusCircle className="h-4 w-4 mr-2" /> Créer un planning
        </Button>
      </div>

      <Card className="shadow-md border-futi-orange/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Vue d'ensemble du planning</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Chauffeur</TableHead>
                <TableHead className="text-futi-night-blue">Véhicule</TableHead>
                <TableHead className="text-futi-night-blue">Propriétaire</TableHead>
                <TableHead className="text-futi-night-blue">Date</TableHead>
                <TableHead className="text-futi-night-blue">Shift</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generalPlanning.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.driver}</TableCell>
                  <TableCell>{plan.vehicle}</TableCell>
                  <TableCell>{plan.owner}</TableCell>
                  <TableCell>{plan.date}</TableCell>
                  <TableCell>{plan.shift}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-futi-night-blue hover:bg-futi-orange/10 mr-2">
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

export default AdminPlanning;