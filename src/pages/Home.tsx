import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Car className="h-8 w-8 text-futi-accent" />,
    title: "Gestion de véhicule privé",
    description: "Optimisez l'utilisation et la rentabilité de votre véhicule personnel."
  },
  {
    icon: <Users className="h-8 w-8 text-futi-accent" />,
    title: "Mise à disposition des chauffeurs",
    description: "Des chauffeurs professionnels et disciplinés pour vos besoins."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-futi-accent" />,
    title: "Optimisation des recettes",
    description: "Maximisez les revenus générés par votre véhicule grâce à notre expertise."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-futi-accent" />,
    title: "Reporting & traçabilité",
    description: "Suivi transparent et détaillé de toutes les opérations de votre véhicule."
  },
];

const Home = () => {
  return (
    <div className="bg-futi-white">
      {/* Hero Section */}
      <section 
        className="relative text-futi-white py-20 md:py-32 overflow-hidden min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/aston-martin-black-car-dark.jpg')" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-futi-night-blue opacity-70 z-10"></div>

        <div className="container mx-auto text-center relative z-20 px-4">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight animate-fade-in-up">
            <span className="text-futi-accent">FutiCoop</span> : <span className="hidden sm:inline">Sécurité — Rentabilité — Confiance</span><span className="sm:hidden">Sécurité, Rentabilité, Confiance</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200 px-2">
            Transformez votre véhicule en un véritable actif rentable et sécurisé. Votre voiture travaille pour vous — avec confiance et discipline.
          </p>
          <Link to="/contact" className="inline-block px-2">
            <Button className="bg-futi-accent text-futi-night-blue hover:bg-futi-accent/90 px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up delay-400 w-full sm:w-auto">
              Confiez-nous votre véhicule !
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Keys Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-futi-night-blue text-futi-white">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-futi-accent mb-8 sm:mb-12">Nos Services Clés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-futi-white/10 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 border-futi-accent/20 text-futi-white">
                <CardHeader className="flex flex-col items-center text-center p-4 sm:p-6">
                  <div className="p-3 sm:p-4 bg-futi-night-blue rounded-full mb-3 sm:mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-semibold text-futi-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                  <p className="text-sm sm:text-base text-futi-white/80">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose FutiCoop Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-futi-white text-futi-night-blue">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-futi-night-blue mb-8 sm:mb-12">Pourquoi choisir FutiCoop ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="p-4 sm:p-6 bg-futi-night-blue text-futi-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-futi-accent/20">
              <ShieldCheck className="h-10 w-10 text-futi-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Sécurité Maximale</h3>
              <p className="text-sm sm:text-base text-futi-white/80">Nous assurons la protection et la gestion rigoureuse de votre véhicule.</p>
            </div>
            <div className="p-4 sm:p-6 bg-futi-night-blue text-futi-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-futi-accent/20">
              <TrendingUp className="h-10 w-10 text-futi-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Rentabilité Optimale</h3>
              <p className="text-sm sm:text-base text-futi-white/80">Transformez votre véhicule en une source de revenus stable et croissante.</p>
            </div>
            <div className="p-4 sm:p-6 bg-futi-night-blue text-futi-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-futi-accent/20">
              <Users className="h-10 w-10 text-futi-accent mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Confiance et Transparence</h3>
              <p className="text-sm sm:text-base text-futi-white/80">Un partenariat basé sur la clarté, la discipline et la communication.</p>
            </div>
          </div>
          <Link to="/about" className="mt-8 sm:mt-12 inline-block">
            <Button variant="outline" className="bg-transparent text-futi-night-blue border-futi-night-blue hover:bg-futi-night-blue hover:text-futi-white px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-full transition-all duration-300 ease-in-out w-full sm:w-auto max-w-xs sm:max-w-none">
              En savoir plus sur FutiCoop
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-futi-accent text-futi-night-blue text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Rejoignez les propriétaires avisés.</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto px-2">
            Confiez la gestion de votre véhicule à des experts et profitez de la tranquillité d'esprit.
          </p>
          <Link to="/contact" className="inline-block">
            <Button className="bg-futi-night-blue text-futi-accent hover:bg-futi-night-blue/90 px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto max-w-xs sm:max-w-none">
              Contactez-nous dès maintenant
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;