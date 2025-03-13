
import React from "react";
import { Link } from "react-router-dom";
import { Cake, Cookie, Heart, Leaf, Star } from "lucide-react";
import { categories } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const iconMap: Record<string, React.ReactNode> = {
  cake: <Cake className="w-12 h-12" />,
  cookie: <Cookie className="w-12 h-12" />,
  heart: <Heart className="w-12 h-12" />,
  leaf: <Leaf className="w-12 h-12" />,
  star: <Star className="w-12 h-12" />,
};

const CategoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-cake-background py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-cake-text mb-4">
              Cake Categories
            </h1>
            <p className="text-cake-text/70 max-w-2xl mx-auto">
              Browse our delicious cakes by category. From chocolate delights to fruity sensations, we have cakes for every taste and occasion.
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-24 h-24 flex items-center justify-center bg-cake-background rounded-full mb-6 text-cake-primary group-hover:bg-cake-primary/10 transition-colors duration-300">
                    {iconMap[category.icon]}
                  </div>
                  <h2 className="text-2xl font-bold text-cake-text mb-4 group-hover:text-cake-primary transition-colors duration-300">
                    {category.name} Cakes
                  </h2>
                  <p className="text-cake-text/70">
                    Explore our delicious range of {category.name.toLowerCase()} cakes
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoriesPage;
