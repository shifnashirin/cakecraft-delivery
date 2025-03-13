
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { specialOccasions } from "@/lib/data";
import CakeCard from "./CakeCard";

const SpecialOccasionsSection = () => {
  if (specialOccasions.length === 0) return null;
  
  const firstOccasion = specialOccasions[0];
  
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-cake-text mb-4">
          Special Occasions
        </h2>
        <p className="text-center text-cake-text/80 mb-12 max-w-3xl mx-auto">
          Find the perfect cake for your celebration
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <div className="rounded-lg overflow-hidden h-96 relative">
              <img 
                src={firstOccasion.image} 
                alt={firstOccasion.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {firstOccasion.name}
                </h3>
                <p className="text-white/90 mb-4">
                  {firstOccasion.description}
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {firstOccasion.cakes.slice(0, 2).map((cake) => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                className="bg-cake-primary hover:bg-cake-dark text-white"
                asChild
              >
                <Link to="/special-occasions">
                  View All Birthday Celebrations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOccasionsSection;
