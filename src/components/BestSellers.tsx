
import React from "react";
import CakeCard from "./CakeCard";
import { cakes } from "@/lib/data";

const featuredCakes = cakes.filter(cake => cake.featured).slice(0, 3);

const BestSellers = () => {
  return (
    <section className="py-16 bg-cake-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-cake-text mb-4">
          Best Sellers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {featuredCakes.map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
