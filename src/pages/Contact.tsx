import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-futi-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-futi-night-blue mb-16">
          Contactez <span className="text-futi-orange">FutiCoop</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg border-futi-orange/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-futi-night-blue">Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-futi-night-blue">Nom complet</Label>
                  <Input id="name" type="text" placeholder="Votre nom" className="mt-1 border-futi-orange/30 focus:border-futi-orange focus:ring-futi-orange" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-futi-night-blue">Adresse e-mail</Label>
                  <Input id="email" type="email" placeholder="Votre email" className="mt-1 border-futi-orange/30 focus:border-futi-orange focus:ring-futi-orange" />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-futi-night-blue">Sujet</Label>
                  <Input id="subject" type="text" placeholder="Sujet de votre message" className="mt-1 border-futi-orange/30 focus:border-futi-orange focus:ring-futi-orange" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-futi-night-blue">Votre message</Label>
                  <Textarea id="message" placeholder="Écrivez votre message ici..." rows={5} className="mt-1 border-futi-orange/30 focus:border-futi-orange focus:ring-futi-orange" />
                </div>
                <Button type="submit" className="w-full bg-futi-orange text-futi-night-blue hover:bg-futi-orange/90 py-3 text-lg font-semibold">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <Card className="shadow-lg border-futi-orange/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-futi-night-blue">Nos Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-gray-700">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-futi-orange" />
                  <span>1, Avenue 24 Novembre, Gombe — Station Arianna</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-futi-orange" />
                  <span>WhatsApp : +243 837 767 676</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-futi-orange" />
                  <span>contact@futicoop.com (Exemple)</span>
                </div>
              </CardContent>
            </Card>

            {/* Google Map Placeholder */}
            <Card className="shadow-lg border-futi-orange/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-futi-night-blue">Où nous trouver</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-center">
                  <p>Emplacement Google Map (intégration future)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;