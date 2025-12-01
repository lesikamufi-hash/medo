"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  className?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, className }) => {
  // Ajout d'un console.log pour vérifier les images reçues
  useEffect(() => {
    console.log("ImageCarousel received images:", images);
  }, [images]);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <div className={cn("embla absolute inset-0 z-0", className)}> {/* Ajout de z-0 ici */}
      <div className="embla__viewport h-full w-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {images.map((image, index) => (
            <div className="embla__slide relative h-full w-full flex-shrink-0 flex-grow-0 basis-full" key={index}>
              <img
                src={image}
                alt={`Background ${index + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots for navigation */}
      <div className="embla__dots absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "embla__dot w-3 h-3 rounded-full bg-futi-white transition-all duration-200",
              index === selectedIndex ? "bg-futi-accent w-4 h-4" : "opacity-50"
            )}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;