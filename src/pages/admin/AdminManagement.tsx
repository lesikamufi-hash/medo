"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserPlus, UserMinus, Trash2 } from 'lucide-react';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('owner'); // Default role for new users

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
    const toastId = showLoading("Création de l'utilisateur...");
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
        throw new Error(errorData.error || `Échec de la création de l'utilisateur (statut ${response.status})`);
      }

      showSuccess("Utilisateur créé avec succès. Un lien magique a été envoyé à son adresse e-mail.");
      setIsDialogOpen(false);
      setNewFirstName('');
      setNewLastName('');
      setNewEmail('');
      setNewRole('owner'); // Reset to default
      fetchUsers(); // Refresh the list
    } catch (error: any) {
      showError(error.message);
      console.error("Erreur lors de la création de l'utilisateur :", error);
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
              <UserPlus className="h-4 w-4 mr-2" /> Ajouter un utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
              <DialogTitle className="text-futi-night-blue">Ajouter un nouvel utilisateur</DialogTitle>
              <DialogDescription>
                Créez un nouveau compte utilisateur. Un lien magique sera envoyé à son adresse e-mail pour la première connexion.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newFirstName" className="text-right text-futi-night-blue">Prénom</Label>
                <Input
                  id="newFirstName"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  className="col-span-3 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newLastName" className="text-right text-futi-night-blue">Nom</Label>
                <Input
                  id="newLastName"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  className="col-span-3 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newEmail" className="text-right text-futi-night-blue">Email</Label>
                <Input
                  id="newEmail"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="col-span-3 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newRole" className="text-right text-futi-night-blue">Rôle</Label>
                <Select value={newRole} onValueChange={setNewRole}>
                  <SelectTrigger id="newRole" className="col-span-3 border-futi-accent/30 focus:ring-futi-accent focus:border-futi-accent">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner">Propriétaire</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90">
                  Créer l'utilisateur
                </Button>
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
                        disabled={user.role?.name === 'admin' && users.filter(u => u.role?.name === 'admin').length === 1}
                      >
                        {user.role?.name === 'admin' ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:bg-red-100"
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role?.name === 'admin' && users.filter(u => u.role?.name === 'admin').length === 1}
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