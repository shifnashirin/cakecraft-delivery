
import React from "react";
import { Link } from "react-router-dom";
import { specialOccasions } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CakeCard from "@/components/CakeCard";

const SpecialOccasionsPage = () => {
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
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          {specialOccasions.map((occasion) => (
            <div 
              key={occasion.id} 
              className="mb-16 last:mb-0"
            >
              <div className="flex flex-col md:flex-row items-center mb-8">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src={occasion.image} 
                      alt={occasion.name} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold text-cake-text mb-4">
                    {occasion.name}
                  </h2>
                  <p className="text-cake-text/70 mb-6">
                    {occasion.description}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {occasion.cakes.map(cake => (
                  <CakeCard key={cake.id} cake={cake} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialOccasionsPage;
