
import React from "react";
import { Link } from "react-router-dom";
import { Heart, PartyPopper, Gift, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { specialOccasions } from "@/lib/data";
import CakeCard from "./CakeCard";

const getIconComponent = (iconName: string | undefined) => {
  switch (iconName) {
    case "heart":
      return <Heart className="w-8 h-8 text-white" />;
    case "party-popper":
      return <PartyPopper className="w-8 h-8 text-white" />;
    case "gift":
      return <Gift className="w-8 h-8 text-white" />;
    default:
      return null;
  }
};

const SpecialOccasionsSection = () => {
  if (specialOccasions.length === 0) return null;
  
  const firstOccasion = specialOccasions[0];
  
  return (
    <section className="py-16 bg-cake-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-cake-text mb-4">
          Special Occasions
        </h2>
        <p className="text-center text-cake-text/80 mb-12 max-w-3xl mx-auto">
          Crafting sweet memories for your celebrations
        </p>
        
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-full">
              <img 
                src={firstOccasion.imageURL} 
                alt={firstOccasion.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&h=600";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cake-primary/50 to-transparent flex items-center justify-center">
                {getIconComponent(firstOccasion.icon)}
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-bold text-cake-text mb-4">
                {firstOccasion.name}
              </h3>
              <p className="text-cake-text/70 mb-6">
                {firstOccasion.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {firstOccasion.cakes.slice(0, 2).map((cake) => (
                  <Link
                    key={cake.id}
                    to={`/cake/${cake.id}`}
                    className="group block bg-cake-background rounded-lg overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative h-48">
                      <img
                        src={cake.imageURL}
                        alt={cake.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=800&h=600";
                        }}
                      />
                      {cake.tags && cake.tags.includes('bestseller') && (
                        <div className="absolute top-2 left-2 bg-cake-accent text-white px-2 py-1 rounded-full text-xs font-medium">
                          Bestseller
                        </div>
                      )}
                      {cake.tags && cake.tags.includes('trending') && (
                        <div className="absolute top-2 left-2 bg-cake-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                          Trending
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-cake-text">{cake.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1 text-sm text-cake-text">{cake.rating}</span>
                        </div>
                        <span className="text-xs text-cake-text/60">({cake.reviews} reviews)</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-cake-primary font-medium">${cake.price.toFixed(2)}</p>
                        {cake.deliveryTime && (
                          <p className="text-xs text-cake-text/60 mt-1">
                            <Calendar className="w-3 h-3 inline-block mr-1" />
                            {cake.deliveryTime} delivery
                          </p>
                        )}
                      </div>
                      {cake.availableSizes && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {cake.availableSizes.map((size) => (
                            <span key={size} className="text-xs bg-white px-2 py-1 rounded-full border border-cake-border">
                              {size}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  className="bg-cake-primary hover:bg-cake-dark text-white"
                  asChild
                >
                  <Link to="/special-occasions">
                    View All {firstOccasion.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOccasionsSection;
