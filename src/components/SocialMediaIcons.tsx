import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialMediaIconsProps {
  className?: string;
  iconClassName?: string;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ className, iconClassName }) => {
  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-futi-accent hover:text-futi-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:rotate-6 ${iconClassName}`}
      >
        <Facebook className="h-8 w-8" />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-futi-accent hover:text-futi-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:rotate-6 ${iconClassName}`}
      >
        <Twitter className="h-8 w-8" />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-futi-accent hover:text-futi-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:rotate-6 ${iconClassName}`}
      >
        <Instagram className="h-8 w-8" />
      </a>
      <a 
        href="#" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`text-futi-accent hover:text-futi-white transition-all duration-300 ease-in-out transform hover:scale-125 hover:rotate-6 ${iconClassName}`}
      >
        <Linkedin className="h-8 w-8" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;