import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface SocialMediaIconsProps {
  className?: string;
  iconClassName?: string;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ className, iconClassName }) => {
  return (
    <div className={`flex justify-center space-x-6 ${className}`}>
      <a href="#" target="_blank" rel="noopener noreferrer" className={`text-futi-accent hover:text-futi-white transition-colors ${iconClassName}`}>
        <Facebook className="h-8 w-8" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className={`text-futi-accent hover:text-futi-white transition-colors ${iconClassName}`}>
        <Twitter className="h-8 w-8" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className={`text-futi-accent hover:text-futi-white transition-colors ${iconClassName}`}>
        <Instagram className="h-8 w-8" />
      </a>
      <a href="#" target="_blank" rel="noopener noreferrer" className={`text-futi-accent hover:text-futi-white transition-colors ${iconClassName}`}>
        <Linkedin className="h-8 w-8" />
      </a>
    </div>
  );
};

export default SocialMediaIcons;