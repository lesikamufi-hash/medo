"use client";

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showSuccess, showError, showLoading, dismissToast } from '@/utils/toast';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/components/SessionContextProvider';

const AdminLogin = () => {
  const [identifier, setIdentifier] = useState(''); // Can be email or username
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user: sessionUser, isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    console.log("AdminLogin useEffect: isSessionLoading:", isSessionLoading, "sessionUser:", sessionUser);
    if (!isSessionLoading && sessionUser) {
      if (sessionUser.role === 'admin') {
        console.log("AdminLogin: Redirecting to /admin/dashboard");
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.log("AdminLogin: Redirecting to / (non-admin user trying admin login)");
        navigate('/', { replace: true });
      }
    }
  }, [sessionUser, isSessionLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = showLoading("Connexion Admin en cours...");
    console.log("AdminLogin: handleLogin initiated for identifier:", identifier);

    try {
      let emailToLogin = identifier;

      // Check if the identifier is likely an email
      if (!identifier.includes('@')) {
        console.log("AdminLogin: Identifier is not an email, attempting to resolve username to email via Edge Function.");
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
          console.error("AdminLogin: Edge Function error:", errorData.error);
          throw new Error(errorData.error || "Échec de la résolution du nom d'utilisateur.");
        }

        const data = await response.json();
        emailToLogin = data.email;
        console.log("AdminLogin: Username resolved to email:", emailToLogin);
      } else {
        console.log("AdminLogin: Identifier is an email:", identifier);
      }

      console.log("AdminLogin: Attempting signInWithPassword with email:", emailToLogin);
      const { error } = await supabase.auth.signInWithPassword({
        email: emailToLogin,
        password: password,
      });
      console.log("AdminLogin: signInWithPassword returned. Error:", error);

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Connexion Admin réussie ! Vérification des privilèges...");
        // SessionContextProvider will handle navigation
      }
    } catch (error: any) {
      console.error("AdminLogin: Caught error during login:", error.message);
      showError(error.message);
    } finally {
      dismissToast(toastId);
      setLoading(false);
      console.log("AdminLogin: handleLogin finished.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url('/car-background.jpg')" }}
      ></div>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <Card className="max-w-md w-full space-y-8 shadow-lg border-futi-accent/20 relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-futi-night-blue">
            Connexion Administrateur
          </CardTitle>
          <p className="mt-2 text-sm text-gray-600">
            Accédez au back-office de FutiCoop
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;