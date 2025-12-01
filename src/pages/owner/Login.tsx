import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OwnerLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50" // Increased opacity
        style={{ backgroundImage: "url('/driver-background.jpg')" }}
      ></div>
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>

      <Card className="max-w-md w-full space-y-8 shadow-lg border-futi-orange/20 relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-futi-night-blue">
            Connexion Propriétaire
          </CardTitle>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous à votre espace FutiCoop
          </p>
        </CardHeader>
        <CardContent>
          <form className="mt-8 space-y-6">
            <div>
              <Label htmlFor="email" className="sr-only">Adresse e-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Adresse e-mail"
                className="relative block w-full px-3 py-2 border border-futi-orange/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-orange focus:border-futi-orange sm:text-sm"
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
                className="relative block w-full px-3 py-2 border border-futi-orange/30 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-futi-orange focus:border-futi-orange sm:text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="#" className="font-medium text-futi-night-blue hover:text-futi-orange">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-futi-night-blue bg-futi-orange hover:bg-futi-orange/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-futi-orange"
              >
                Se connecter
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <Link to="/owner/register" className="font-medium text-futi-night-blue hover:text-futi-orange">
              Inscrivez-vous
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerLogin;