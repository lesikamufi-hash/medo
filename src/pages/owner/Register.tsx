import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';

const OwnerRegister = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const toastId = showLoading("Inscription en cours...");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone_number: phone, // Supabase auth.users doesn't have a direct phone field, but can be stored in user_metadata
          },
          emailRedirectTo: `${window.location.origin}/owner/login`, // Redirect after email confirmation
        },
      });

      // Log the Supabase response for debugging
      console.log("Supabase signUp response:", { data, error });

      if (error) {
        showError(error.message);
      } else if (data.user) {
        showSuccess("Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.");
        navigate('/owner/login'); // Redirect to login page after successful signup
      } else if (data.session === null && data.user === null) {
        // This case happens when email confirmation is required
        showSuccess("Inscription réussie ! Veuillez vérifier votre e-mail pour confirmer votre compte.");
        navigate('/owner/login');
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
              <Label htmlFor="phone" className="sr-only">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="Numéro de téléphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <Label htmlFor="confirm-password" className="sr-only">Confirmer le mot de passe</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
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
                disabled={loading}
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