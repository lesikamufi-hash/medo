import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BellRing, CheckCircle, XCircle } from 'lucide-react';

const notifications = [
  { id: 'n001', type: 'Urgent', message: 'Entretien imminent pour Toyota Corolla (ABC-123)', date: '2024-07-30 10:00', status: 'Non lue' },
  { id: 'n002', type: 'Info', message: 'Nouveau propriétaire enregistré: Jean Dupont', date: '2024-07-29 15:30', status: 'Lue' },
  { id: 'n003', type: 'Alerte', message: 'Problème de localisation pour chauffeur Marie-Claire', date: '2024-07-29 08:45', status: 'Non lue' },
];

const AdminNotifications = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-futi-night-blue">Notifications</h2>

      <Card className="shadow-md border-futi-accent/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Liste des notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-futi-night-blue">Type</TableHead>
                <TableHead className="text-futi-night-blue">Message</TableHead>
                <TableHead className="text-futi-night-blue">Date</TableHead>
                <TableHead className="text-futi-night-blue">Statut</TableHead>
                <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notifications.map((notification) => (
                <TableRow key={notification.id} className={notification.status === 'Non lue' ? 'bg-yellow-50/50' : ''}>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      notification.type === 'Urgent' ? 'bg-red-100 text-red-800' :
                      notification.type === 'Alerte' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {notification.type}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{notification.message}</TableCell>
                  <TableCell>{notification.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      notification.status === 'Non lue' ? 'bg-red-100 text-red-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {notification.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    {notification.status === 'Non lue' && (
                      <Button variant="ghost" size="icon" className="text-green-600 hover:bg-green-100 mr-2">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100">
                      <XCircle className="h-4 w-4" />
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

export default AdminNotifications;