import React from 'react';
import { Target, Eye, Handshake, History } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="bg-futi-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-futi-night-blue mb-16">
          À propos de <span className="text-futi-gold">FutiCoop</span>
        </h1>

        {/* Mission Section */}
        <section className="mb-16">
          <Card className="bg-futi-night-blue text-futi-white shadow-lg border-futi-gold/20">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Target className="h-10 w-10 text-futi-gold" />
              <CardTitle className="text-3xl font-semibold">Notre Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed">
              <p>
                Chez FutiCoop, notre mission est de transformer la gestion de véhicules en une expérience sans souci et hautement rentable pour nos clients. Nous nous engageons à offrir des services de gestion automobile professionnels, sécurisés et transparents, permettant aux propriétaires de maximiser la valeur de leurs actifs tout en garantissant une tranquillité d'esprit totale.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <Card className="bg-futi-white text-futi-night-blue shadow-lg border-futi-gold/20">
            <CardHeader className="flex flex-row items-center space-x-4">
              <Eye className="h-10 w-10 text-futi-gold" />
              <CardTitle className="text-3xl font-semibold">Notre Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed">
              <p>
                Nous aspirons à être le leader incontesté de la gestion automobile en Afrique, reconnu pour notre excellence opérationnelle, notre innovation et notre engagement inébranlable envers la satisfaction client. Nous visons à créer un écosystème où chaque véhicule est géré avec la plus grande efficacité, contribuant ainsi à la prospérité de nos partenaires et à la mobilité durable.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-futi-night-blue mb-12">Nos Valeurs Fondamentales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 shadow-md border-futi-gold/20">
              <Handshake className="h-12 w-12 text-futi-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-futi-night-blue mb-2">Confiance</h3>
              <p className="text-gray-700">Bâtir des relations durables basées sur l'honnêteté et la transparence.</p>
            </Card>
            <Card className="text-center p-6 shadow-md border-futi-gold/20">
              <ShieldCheck className="h-12 w-12 text-futi-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-futi-night-blue mb-2">Sécurité</h3>
              <p className="text-gray-700">Assurer la protection des véhicules et la tranquillité d'esprit des propriétaires.</p>
            </Card>
            <Card className="text-center p-6 shadow-md border-futi-gold/20">
              <TrendingUp className="h-12 w-12 text-futi-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-futi-night-blue mb-2">Rentabilité</h3>
              <p className="text-gray-700">Maximiser les retours sur investissement pour nos clients.</p>
            </Card>
          </div>
        </section>

        {/* History Section */}
        <section>
          <Card className="bg-futi-night-blue text-futi-white shadow-lg border-futi-gold/20">
            <CardHeader className="flex flex-row items-center space-x-4">
              <History className="h-10 w-10 text-futi-gold" />
              <CardTitle className="text-3xl font-semibold">Notre Histoire</CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed">
              <p>
                FutiCoop a été fondée avec la vision de révolutionner la gestion automobile. Depuis nos débuts, nous avons mis l'accent sur l'innovation, la qualité de service et une approche centrée sur le client. Au fil des ans, nous avons développé une expertise solide et une réputation d'excellence, devenant un partenaire de confiance pour de nombreux propriétaires de véhicules. Notre parcours est marqué par une croissance constante et un engagement continu à dépasser les attentes.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default About;