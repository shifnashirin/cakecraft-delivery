
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cakes } from "@/lib/data";

const featuredCakes = cakes.filter(cake => cake.featured);

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(featuredCakes.map(() => false));

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === featuredCakes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? featuredCakes.length - 1 : prevIndex - 1
    );
  };

  const handleImageError = (index: number) => {
    const newImagesLoaded = [...imagesLoaded];
    newImagesLoaded[index] = true;
    setImagesLoaded(newImagesLoaded);
  };

  const defaultImage = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&h=600";

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (featuredCakes.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {featuredCakes.map((cake, index) => (
        <div
          key={cake.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
            ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${!imagesLoaded[index] ? cake.image : defaultImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img 
            src={cake.image} 
            alt="" 
            className="hidden"
            onError={() => handleImageError(index)}
          />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-16">
            <div className="max-w-xl text-left">
              <h1 
                className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                {cake.name}
              </h1>
              <p 
                className="text-xl text-white mb-8 animate-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                {cake.description}
              </p>
              <div 
                className="flex space-x-4 animate-fade-in"
                style={{ animationDelay: "600ms" }}
              >
                <p className="text-3xl font-bold text-white mb-6">
                  ${cake.price.toFixed(2)}
                </p>
              </div>
              <Button 
                className="bg-cake-primary hover:bg-cake-dark text-white animate-fade-in"
                style={{ animationDelay: "800ms" }}
                asChild
              >
                <a href={`/cake/${cake.id}`}>Order Now</a>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {featuredCakes.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 
              ${index === activeIndex ? "bg-white" : "bg-white/50"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
