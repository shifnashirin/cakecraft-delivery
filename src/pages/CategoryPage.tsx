
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cakes, categories } from "@/lib/data";
import CakeCard from "@/components/CakeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const category = categories.find(cat => cat.id === id);
  const categoryCakes = cakes.filter(cake => cake.category === id);
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cake-text mb-4">Category not found</h2>
            <Link to="/" className="text-cake-primary hover:underline">
              Return to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-cake-background py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm mb-4">
              <Link to="/" className="text-cake-text/70 hover:text-cake-primary">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-cake-text/50" />
              <Link to="/categories" className="text-cake-text/70 hover:text-cake-primary">
                Categories
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-cake-text/50" />
              <span className="text-cake-primary">{category.name}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-cake-text">
              {category.name} Cakes
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {categoryCakes.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-cake-text mb-4">
                No cakes found in this category
              </h2>
              <p className="text-cake-text/70 mb-8">
                We're constantly adding new cakes, please check back later.
              </p>
              <Link 
                to="/" 
                className="text-cake-primary hover:underline"
              >
                Browse other categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryCakes.map(cake => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
