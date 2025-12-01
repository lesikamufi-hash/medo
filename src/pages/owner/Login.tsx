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
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const navigate = useNavigate();
  const { user: sessionUser, isLoading: isSessionLoading } = useSession();

  useEffect(() => {
    if (!isSessionLoading && sessionUser) {
      if (sessionUser.role === 'owner') {
        navigate('/owner/dashboard', { replace: true });
      } else if (sessionUser.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [sessionUser, isSessionLoading, navigate]);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = showLoading("Envoi du lien magique...");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/owner/dashboard`, // Redirect to owner dashboard after magic link click
        },
      });

      if (error) {
        showError(error.message);
      } else {
        showSuccess("Lien magique envoyé à votre adresse e-mail ! Vérifiez votre boîte de réception.");
        setMagicLinkSent(true);
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
            Connectez-vous à votre espace FutiCoop avec votre adresse e-mail
          </p>
        </CardHeader>
        <CardContent>
          <form className="mt-8 space-y-6" onSubmit={handleSendMagicLink}>
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
                disabled={magicLinkSent}
              />
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-futi-night-blue bg-futi-accent hover:bg-futi-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-futi-accent"
                disabled={loading}
              >
                {loading ? "Envoi..." : (magicLinkSent ? "Lien envoyé !" : "Envoyer le lien magique")}
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