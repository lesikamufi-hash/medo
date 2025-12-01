import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, UserPlus, UserMinus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client'; // Pour obtenir le jeton JWT

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: { name: string };
  created_at: string;
}

const AdminManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // États du formulaire pour l'ajout d'un nouvel utilisateur
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('owner'); // Rôle par défaut pour les nouveaux utilisateurs

  // URL de votre fonction Edge (remplacez 'lfmyjpnelfvpgdhfojwt' par votre ID de projet Supabase)
  const EDGE_FUNCTION_URL = `https://lfmyjpnelfvpgdhfojwt.supabase.co/functions/v1/manage-users`;

  const fetchUsers = async () => {
    setLoading(true);
    const toastId = showLoading("Chargement des utilisateurs...");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Aucune session active. Veuillez vous connecter en tant qu'administrateur Supabase.");
      }

      const response = await fetch(EDGE_FUNCTION_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Échec du chargement des utilisateurs');
      }

      const data: UserProfile[] = await response.json();
      setUsers(data);
      showSuccess("Utilisateurs chargés.");
    } catch (error: any) {
      showError(error.message);
      console.error("Erreur lors du chargement des utilisateurs :", error);
    } finally {
      dismissToast(toastId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, currentRole: string) => {
    const newRoleName = currentRole === 'admin' ? 'owner' : 'admin';
    const toastId = showLoading(`Changement de rôle pour ${userId} en ${newRoleName}...`);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Aucune session active. Veuillez vous connecter en tant qu'administrateur Supabase.");
      }

      const response = await fetch(`${EDGE_FUNCTION_URL}/role`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userId, roleName: newRoleName }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`Erreur du serveur (statut ${response.status}): ${response.statusText || 'Réponse non-JSON ou vide'}`);
        }
        throw new Error(errorData.error || `Échec de la mise à jour du rôle utilisateur (statut ${response.status})`);
      }

      showSuccess(`Rôle de l'utilisateur mis à jour en ${newRoleName}.`);
      fetchUsers(); // Actualiser la liste
    } catch (error: any) {
      showError(error.message);
      console.error("Erreur lors de la mise à jour du rôle :", error);
    } finally {
      dismissToast(toastId);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) {
      return;
    }

    const toastId = showLoading(`Suppression de l'utilisateur ${userId}...`);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Aucune session active. Veuillez vous connecter en tant qu'administrateur Supabase.");
      }

      const response = await fetch(`${EDGE_FUNCTION_URL}/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          // Si la réponse n'est pas JSON ou est vide, nous affichons un message générique avec le statut
          throw new Error(`Erreur du serveur (statut ${response.status}): ${response.statusText || 'Réponse non-JSON ou vide'}`);
        }
        throw new Error(errorData.error || `Échec de la suppression de l'utilisateur (statut ${response.status})`);
      }

      showSuccess("Utilisateur supprimé avec succès.");
      fetchUsers(); // Actualiser la liste
    } catch (error: any) {
      showError(error.message);
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    } finally {
      dismissToast(toastId);
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = showLoading("Ajout de l'utilisateur...");
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error("Aucune session active. Veuillez vous connecter en tant qu'administrateur Supabase.");
      }

      const response = await fetch(`${EDGE_FUNCTION_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          email: newEmail,
          password: newPassword,
          firstName: newFirstName,
          lastName: newLastName,
          roleName: newRole,
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          throw new Error(`Erreur du serveur (statut ${response.status}): ${response.statusText || 'Réponse non-JSON ou vide'}`);
        }
        throw new Error(errorData.error || `Échec de l'ajout de l'utilisateur (statut ${response.status})`);
      }

      showSuccess("Utilisateur ajouté avec succès !");
      setIsDialogOpen(false);
      setNewFirstName('');
      setNewLastName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('owner');
      fetchUsers(); // Actualiser la liste
    } catch (error: any) {
      showError(error.message);
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    } finally {
      dismissToast(toastId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-futi-night-blue">Gestion des Utilisateurs</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">
              <PlusCircle className="h-4 w-4 mr-2" /> Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-futi-white text-futi-night-blue">
            <DialogHeader>
              <DialogTitle className="text-futi-night-blue">Ajouter un nouvel utilisateur</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstName" className="text-right">Prénom</Label>
                <Input id="firstName" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} className="col-span-3 border-futi-accent/30" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastName" className="text-right">Nom</Label>
                <Input id="lastName" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} className="col-span-3 border-futi-accent/30" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="col-span-3 border-futi-accent/30" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Mot de passe</Label>
                <Input id="password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="col-span-3 border-futi-accent/30" required />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">Rôle</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger className="col-span-3 border-futi-accent/30">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Propriétaire</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">Ajouter l'utilisateur</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-md border-futi-accent/20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-futi-night-blue">Liste des utilisateurs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-600">Chargement...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-futi-night-blue">Email</TableHead>
                  <TableHead className="text-futi-night-blue">Prénom</TableHead>
                  <TableHead className="text-futi-night-blue">Nom</TableHead>
                  <TableHead className="text-futi-night-blue">Rôle</TableHead>
                  <TableHead className="text-futi-night-blue text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role?.name === 'admin' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role?.name || 'N/A'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-futi-night-blue hover:bg-futi-accent/10 mr-2"
                        onClick={() => handleRoleChange(user.id, user.role?.name || '')}
                        disabled={user.role?.name === 'admin' && users.filter(u => u.role?.name === 'admin').length === 1} // Empêche de rétrograder le dernier admin
                      >
                        {user.role?.name === 'admin' ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-100"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role?.name === 'admin' && users.filter(u => u.role?.name === 'admin').length === 1} // Empêche de supprimer le dernier admin
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagement;