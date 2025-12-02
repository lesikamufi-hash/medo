import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialMediaIcons from '@/components/SocialMediaIcons';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'; // Import Google Maps components

const containerStyle = {
  width: '100%',
  height: '400px'
};

// Approximate coordinates for Gombe, Kinshasa
const center = {
  lat: -4.3162, // Latitude for Gombe, Kinshasa
  lng: 15.3131  // Longitude for Gombe, Kinshasa
};

const Contact = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Use the API key from environment variables
  });

  return (
    <div className="bg-futi-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-futi-night-blue mb-16">
          Contactez <span className="text-futi-accent">FutiCoop</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg border-futi-accent/20">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-futi-night-blue">Envoyez-nous un message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-futi-night-blue">Nom complet</Label>
                  <Input id="name" type="text" placeholder="Votre nom" className="mt-1 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-futi-night-blue">Adresse e-mail</Label>
                  <Input id="email" type="email" placeholder="Votre email" className="mt-1 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent" />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-futi-night-blue">Sujet</Label>
                  <Input id="subject" type="text" placeholder="Sujet de votre message" className="mt-1 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-futi-night-blue">Votre message</Label>
                  <Textarea id="message" placeholder="Écrivez votre message ici..." rows={5} className="mt-1 border-futi-accent/30 focus:border-futi-accent focus:ring-futi-accent" />
                </div>
                <Button type="submit" className="w-full bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90 py-3 text-lg font-semibold">
                  Envoyer le message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Social Media */}
          <div className="space-y-8">
            <Card className="shadow-lg border-futi-accent/20 relative overflow-hidden">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{ backgroundImage: "url('/moto-cool-a-l-interieur.jpg')" }}
              ></div>
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-futi-night-blue opacity-70"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl font-semibold text-futi-white">Nos Coordonnées</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-futi-white relative z-10">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-futi-accent" />
                  <span>1, Avenue 24 Novembre, Gombe — Station Arianna</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-6 w-6 text-futi-accent" />
                  <span>WhatsApp : +243 837 767 676</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-6 w-6 text-futi-accent" />
                  <span>contact@futicoop.com (Exemple)</span>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card className="shadow-lg border-futi-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-futi-night-blue">Suivez-nous</CardTitle>
              </CardHeader>
              <CardContent>
                <SocialMediaIcons />
              </CardContent>
            </Card>

            {/* Google Map */}
            <Card className="shadow-lg border-futi-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-futi-night-blue">Où nous trouver</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-center">
                    Chargement de la carte...
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;