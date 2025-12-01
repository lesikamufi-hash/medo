import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react';

const owners = [
  { id: 'o001', name: 'Jean Dupont', phone: '+243 812 345 678', email: 'jean.dupont@example.com', registrationDate: '2023-01-10' },
  { id: 'o002', name: 'Marie Curie', phone: '+243 823 456 789', email: 'marie.curie@example.com', registrationDate: '2023-02-20' },
  { id: 'o003', name: 'Pierre Martin', phone: '+243 834 567 890', email: 'pierre.martin@example.com', registrationDate: '2023-03-05' },
];

const AdminOwners = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-futi-night-blue">Gestion des Propriétaires</h2>
        <Button className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">
          <PlusCircle className="h-4 w-4 mr-2" /> Ajouter un propriétaire
        </Button>
      </div>

      <Card className="shadow-md border-futi-accent/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Liste des propriétaires</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Nom</TableHead>
                <TableHead className="text-futi-night-blue">Téléphone</TableHead>
                <TableHead className="text-futi-night-blue">Email</TableHead>
                <TableHead className="text-futi-night-blue">Date d'inscription</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {owners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.name}</TableCell>
                  <TableCell>{owner.phone}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>{owner.registrationDate}</TableCell>
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOwners;