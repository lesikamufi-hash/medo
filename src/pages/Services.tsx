import React from 'react';
import { Car, Users, TrendingUp, FileText, Wrench, CalendarCheck, ShieldCheck, ClipboardList, Gavel, BellRing } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const serviceList = [
  {
    icon: <Car className="h-8 w-8 text-futi-orange" />,
    title: "Gestion de véhicule privé",
    description: "Une gestion complète pour optimiser l'utilisation et la rentabilité de votre véhicule personnel, en toute sérénité."
  },
  {
    icon: <Users className="h-8 w-8 text-futi-orange" />,
    title: "Transport privé & VIP",
    description: "Des solutions de transport haut de gamme avec des chauffeurs professionnels pour vos déplacements privés et VIP."
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-futi-orange" />,
    title: "Location véhicule",
    description: "Mise à disposition de véhicules pour la location, gérée de A à Z pour maximiser vos revenus sans effort."
  },
  {
    icon: <FileText className="h-8 w-8 text-futi-orange" />,
    title: "Assistance administrative automobile",
    description: "Prise en charge de toutes les démarches administratives liées à votre véhicule (immatriculation, assurances, etc.)."
  },
  {
    icon: <Wrench className="h-8 w-8 text-futi-orange" />,
    title: "Entretien & suivi technique",
    description: "Un suivi rigoureux et planifié de l'entretien de votre véhicule pour garantir sa longévité et sa performance."
  },
  {
    icon: <Users className="h-8 w-8 text-futi-orange" />,
    title: "Mise à disposition des chauffeurs",
    description: "Des chauffeurs qualifiés, expérimentés et disciplinés, mis à votre disposition selon vos besoins."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-futi-orange" />,
    title: "Optimisation des recettes",
    description: "Stratégies personnalisées pour maximiser les revenus générés par votre véhicule, avec une analyse constante du marché."
  },
  {
    icon: <ClipboardList className="h-8 w-8 text-futi-orange" />,
    title: "Reporting & traçabilité",
    description: "Des rapports détaillés et une traçabilité complète de toutes les activités et performances de votre véhicule."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-futi-orange" />,
    title: "Supervision & discipline des chauffeurs",
    description: "Un encadrement strict et une supervision continue pour assurer la discipline et l'efficacité de nos chauffeurs."
  },
  {
    icon: <Gavel className="h-8 w-8 text-futi-orange" />,
    title: "Accompagnement légal et administratif",
    description: "Conseils et assistance pour toutes les questions légales et administratives liées à la gestion de votre flotte."
  },
  {
    icon: <BellRing className="h-8 w-8 text-futi-orange" />,
    title: "Réduction des risques opérationnels",
    description: "Mise en place de protocoles pour minimiser les risques liés à l'exploitation et à la gestion de vos véhicules."
  },
];

const Services = () => {
  return (
    <div className="bg-futi-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-futi-night-blue mb-16">
          Nos <span className="text-futi-orange">Services</span>
        </h1>

        <p className="text-center text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-12">
          Découvrez comment FutiCoop peut transformer la gestion de votre véhicule en un véritable actif rentable et sécurisé. Nous offrons une gamme complète de services adaptés à vos besoins.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <Card key={index} className="bg-futi-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-futi-orange/20">
              <CardHeader className="flex flex-row items-center space-x-4">
                <div className="p-3 bg-futi-night-blue rounded-full">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-futi-night-blue">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;