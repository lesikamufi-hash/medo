import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const revenues = [
  { id: 'r001', vehicle: 'Toyota Corolla (ABC-123)', amount: '150.000 CDF', date: '2024-07-30', type: 'Course' },
  { id: 'r002', vehicle: 'Mercedes C-Class (DEF-456)', amount: '200.000 CDF', date: '2024-07-29', type: 'Location' },
  { id: 'r003', vehicle: 'Toyota Corolla (ABC-123)', amount: '100.000 CDF', date: '2024-07-29', type: 'Course' },
];

const expenses = [
  { id: 'e001', vehicle: 'Toyota Corolla (ABC-123)', amount: '50.000 CDF', date: '2024-07-28', description: 'Carburant' },
  { id: 'e002', vehicle: 'Mercedes C-Class (DEF-456)', amount: '20.000 CDF', date: '2024-07-27', description: 'Lavage' },
  { id: 'e003', vehicle: 'Hyundai Tucson (GHI-789)', amount: '150.000 CDF', date: '2024-07-25', description: 'Réparation pneu' },
];

const AdminFinance = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-futi-night-blue">Recettes & Dépenses</h2>

      {/* Revenues Section */}
      <Card className="shadow-md border-futi-gold/20">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Recettes</CardTitle>
          <Button className="bg-futi-gold text-futi-night-blue hover:bg-futi-gold/90">
            <PlusCircle className="h-4 w-4 mr-2" /> Ajouter une recette
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Véhicule</TableHead>
                <TableHead className="text-futi-night-blue">Montant</TableHead>
                <TableHead className="text-futi-night-blue">Date</TableHead>
                <TableHead className="text-futi-night-blue">Type</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenues.map((revenue) => (
                <TableRow key={revenue.id}>
                  <TableCell className="font-medium">{revenue.vehicle}</TableCell>
                  <TableCell>{revenue.amount}</TableCell>
                  <TableCell>{revenue.date}</TableCell>
                  <TableCell>{revenue.type}</TableCell>
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

      {/* Expenses Section */}
      <Card className="shadow-md border-futi-gold/20">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Dépenses</CardTitle>
          <Button className="bg-futi-gold text-futi-night-blue hover:bg-futi-gold/90">
            <PlusCircle className="h-4 w-4 mr-2" /> Ajouter une dépense
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Véhicule</TableHead>
                <TableHead className="text-futi-night-blue">Montant</TableHead>
                <TableHead className="text-futi-night-blue">Description</TableHead>
                <TableHead className="text-futi-night-blue">Date</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.vehicle}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>{expense.date}</TableCell>
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

export default AdminFinance;