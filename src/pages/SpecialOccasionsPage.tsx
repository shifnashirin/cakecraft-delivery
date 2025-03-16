
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { specialOccasions } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CakeCard from "@/components/CakeCard";
import { Star, Calendar, Heart, Gift, PartyPopper, Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const getIconComponent = (iconName: string | undefined) => {
  switch (iconName) {
    case "heart":
      return <Heart className="w-16 h-16 text-white" />;
    case "party-popper":
      return <PartyPopper className="w-16 h-16 text-white" />;
    case "gift":
      return <Gift className="w-16 h-16 text-white" />;
    default:
      return null;
  }
};

const SpecialOccasionsPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: 'all',
    availability: 'all',
    rating: 'all'
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-cake-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-cake-text mb-4">
              Special Occasions
            </h1>
            <p className="text-cake-text/70 max-w-2xl mx-auto">
              Find the perfect cake for your celebrations. Whether it's a birthday, wedding, or any special event, we have cakes that will make your occasion memorable.
            </p>
            
            {/* Search and Filter Bar */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search cakes..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-cake-border focus:outline-none focus:ring-2 focus:ring-cake-primary focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cake-text/60" />
              </div>
              
              <div className="flex gap-2">
                <select
                  className="px-4 py-2 rounded-lg border border-cake-border bg-white focus:outline-none focus:ring-2 focus:ring-cake-primary focus:border-transparent"
                  value={selectedFilters.priceRange}
                  onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
                >
                  <option value="all">All Prices</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="over-100">Over $100</option>
                </select>
                
                <select
                  className="px-4 py-2 rounded-lg border border-cake-border bg-white focus:outline-none focus:ring-2 focus:ring-cake-primary focus:border-transparent"
                  value={selectedFilters.availability}
                  onChange={(e) => setSelectedFilters({...selectedFilters, availability: e.target.value})}
                >
                  <option value="all">All Availability</option>
                  <option value="24h">24 Hours</option>
                  <option value="48h">48 Hours</option>
                  <option value="72h">72 Hours</option>
                </select>
                
                <select
                  className="px-4 py-2 rounded-lg border border-cake-border bg-white focus:outline-none focus:ring-2 focus:ring-cake-primary focus:border-transparent"
                  value={selectedFilters.rating}
                  onChange={(e) => setSelectedFilters({...selectedFilters, rating: e.target.value})}
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-16">
            {specialOccasions.map((occasion) => (
              <div 
                key={occasion.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <img 
                      src={occasion.imageURL} 
                      alt={occasion.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cake-primary/50 to-transparent flex items-center justify-center">
                      {getIconComponent(occasion.icon)}
                    </div>
                  </div>
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-cake-text mb-4">
                      {occasion.name}
                    </h2>
                    <p className="text-cake-text/70 mb-6">
                      {occasion.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {occasion.cakes.map((cake) => (
                        <Link
                          key={cake.id}
                          to={`/cake/${cake.id}`}
                          className="group block bg-cake-background rounded-lg overflow-hidden hover:shadow-md transition-all"
                        >
                          <div className="relative h-48">
                            <img
                              src={cake.imageURL}
                              alt={cake.name}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
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
                            <h3 className="font-semibold text-cake-text">{cake.name}</h3>
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

                    <Button 
                      className="mt-8 w-full bg-cake-primary hover:bg-cake-dark text-white"
                    >
                      View All {occasion.name}
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialOccasionsPage;
