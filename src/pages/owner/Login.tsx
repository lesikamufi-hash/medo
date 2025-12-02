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

const OwnerLogin = () => {
  const [identifier, setIdentifier] = useState(''); // Can be email or username
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user: sessionUser, isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    console.log("OwnerLogin useEffect: isSessionLoading:", isSessionLoading, "sessionUser:", sessionUser);
    if (!isSessionLoading && sessionUser) {
      if (sessionUser.role === 'owner') {
        console.log("OwnerLogin: Redirecting to /owner/dashboard");
        navigate('/owner/dashboard', { replace: true });
      } else if (sessionUser.role === 'admin') {
        console.log("OwnerLogin: Redirecting to /admin/dashboard (admin user trying owner login)");
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.log("OwnerLogin: Redirecting to / (user with no specific role)");
        navigate('/', { replace: true });
      }
    }
  }, [sessionUser, isSessionLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = showLoading("Connexion en cours...");
    console.log("OwnerLogin: handleLogin initiated for identifier:", identifier);

    try {
      let emailToLogin = identifier;

      // Check if the identifier is likely an email
      if (!identifier.includes('@')) {
        console.log("OwnerLogin: Identifier is not an email, attempting to resolve username to email via Edge Function.");
        // If not an email, assume it's a username and call the Edge Function
        const EDGE_FUNCTION_URL = `https://lfmyjpnelfvpgdhfojwt.supabase.co/functions/v1/resolve-username-to-email`;
        
        const response = await fetch(EDGE_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: identifier }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("OwnerLogin: Edge Function error:", errorData.error);
          throw new Error(errorData.error || "Échec de la résolution du nom d'utilisateur.");
        }

        const data = await response.json();
        emailToLogin = data.email;
        console.log("OwnerLogin: Username resolved to email:", emailToLogin);
      } else {
        console.log("OwnerLogin: Identifier is an email:", identifier);
      }

      console.log("OwnerLogin: Attempting signInWithPassword with email:", emailToLogin);
      const { error } = await supabase.auth.signInWithPassword({
        email: emailToLogin,
        password: password,
      });
      console.log("OwnerLogin: signInWithPassword returned. Error:", error);

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Connexion réussie ! Redirection vers votre tableau de bord.");
        // SessionContextProvider will handle navigation
      }
    } catch (error: any) {
      console.error("OwnerLogin: Caught error during login:", error.message);
      showError(error.message);
    } finally {
      dismissToast(toastId);
      setLoading(false);
      console.log("OwnerLogin: handleLogin finished.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/driver-background.jpg')" }}
      ></div>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <Card className="max-w-md w-full space-y-8 shadow-lg border-futi-accent/20 relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-futi-night-blue">
            Connexion Propriétaire
          </CardTitle>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous à votre espace FutiCoop
          </p>
        </CardHeader>
        <CardContent>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="identifier" className="sr-only">E-mail ou Nom d'utilisateur</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text" // Changed to text to accept username
                autoComplete="username email"
                required
                placeholder="E-mail ou Nom d'utilisateur"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">Mot de passe</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 border border-futi-accent/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-accent focus:border-futi-accent sm:text-sm"
              />
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-futi-night-blue bg-futi-accent hover:bg-futi-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-futi-accent"
                disabled={loading}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/owner/register" className="font-medium text-futi-night-blue hover:text-futi-accent">
              Inscrivez-vous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerLogin;