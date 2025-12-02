"use client";

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { useSession } from '@/components/SessionContextProvider';

const OwnerRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [ownerRoleId, setOwnerRoleId] = useState<string | null>(null); // State to store owner role ID
  const navigate = useNavigate();
  const { user: sessionUser, isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    console.log("OwnerRegister: useEffect triggered.");
    // Fetch the 'owner' role ID when the component mounts
    const fetchOwnerRoleId = async () => {
      console.log("OwnerRegister: fetchOwnerRoleId called.");
      const { data, error } = await supabase
        .from('roles')
        .select('id')
        .eq('name', 'owner')
        .single();

      if (error) {
        console.error("OwnerRegister: Error fetching 'owner' role ID:", error.message, error); // Log the full error object
        showError("Erreur lors de la récupération de l'ID du rôle 'propriétaire': " + error.message);
      } else if (data) {
        console.log("OwnerRegister: Successfully fetched 'owner' role ID:", data.id);
        setOwnerRoleId(data.id);
      } else {
        console.warn("OwnerRegister: Role 'owner' not found in the database or data is null.");
        showError("Le rôle 'propriétaire' n'a pas été trouvé dans la base de données. Veuillez contacter l'administrateur.");
      }
    };
    fetchOwnerRoleId();

    if (!isSessionLoading && sessionUser) {
      console.log("OwnerRegister: User already logged in, checking role for redirection. Role:", sessionUser.role);
      if (sessionUser.role === 'owner') {
        navigate('/owner/dashboard', { replace: true });
      } else if (sessionUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [sessionUser, isSessionLoading, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = showLoading("Inscription en cours...");

    if (password !== confirmPassword) {
      showError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      dismissToast(toastId);
      return;
    }

    if (!ownerRoleId) {
      showError("Impossible de s'inscrire : l'ID du rôle 'propriétaire' n'a pas été chargé.");
      setLoading(false);
      dismissToast(toastId);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username.toLowerCase(),
            initial_role_id: ownerRoleId, // Pass the actual UUID for the 'owner' role
          },
        },
      });

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        navigate('/owner/login', { replace: true });
      }
    } catch (error: any) {
      showError(error.message);
    } finally {
      dismissToast(toastId);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/moto-cool-a-l-interieur.jpg')" }}
      ></div>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <Card className="max-w-md w-full space-y-8 shadow-lg border-futi-accent/20 relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-futi-night-blue">
            Inscription Propriétaire
          </CardTitle>
          <p className="mt-2 text-sm text-gray-600">
            Créez votre compte FutiCoop
          </p>
        </CardHeader>
        <CardContent>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div>
              <Label htmlFor="firstName" className="sr-only">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                placeholder="Prénom"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="sr-only">Nom de famille</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                placeholder="Nom de famille"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="username" className="sr-only">Nom d'utilisateur</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="email" className="sr-only">Adresse e-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Adresse e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="sr-only">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-futi-night-blue bg-futi-accent hover:bg-futi-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-futi-accent"
                disabled={loading || !ownerRoleId} // Disable button if loading or role ID not fetched
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link to="/owner/login" className="font-medium text-futi-night-blue hover:text-futi-accent">
              Connectez-vous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerRegister;