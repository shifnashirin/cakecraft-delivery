
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cakes } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CakeCard from "@/components/CakeCard";

const CakeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const cake = cakes.find(cake => cake.id === id);
  
  if (!cake) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cake-text mb-4">Cake not found</h2>
            <Link to="/" className="text-cake-primary hover:underline">
              Return to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(cake);
    }
  };

  // Find related cakes in the same category
  const relatedCakes = cakes
    .filter(c => c.category === cake.category && c.id !== cake.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cake Image */}
            <div className="lg:w-1/2">
              <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img 
                  src={cake.imageURL} 
                  alt={cake.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Cake Details */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-cake-text mb-4">
                {cake.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{cake.rating}</span>
                </div>
                <span className="text-gray-500">
                  ({cake.reviews} reviews)
                </span>
              </div>
              
              <p className="text-xl font-bold text-cake-primary mb-6">
                ${cake.price.toFixed(2)}
              </p>
              
              <p className="text-cake-text/80 mb-8">
                {cake.description}
              </p>
              
              <div className="mb-8">
                <p className="font-medium text-cake-text mb-2">Category:</p>
                <Link 
                  to={`/category/${cake.category}`}
                  className="inline-block px-4 py-2 bg-cake-background rounded-md text-cake-text hover:bg-cake-accent/20 transition-colors"
                >
                  {cake.category.charAt(0).toUpperCase() + cake.category.slice(1)}
                </Link>
              </div>
              
              <div className="flex items-center mb-8">
                <p className="font-medium text-cake-text mr-4">Quantity:</p>
                <div className="flex items-center border border-cake-border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decrementQuantity}
                    className="text-cake-text hover:text-cake-primary hover:bg-transparent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={incrementQuantity}
                    className="text-cake-text hover:text-cake-primary hover:bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  className="flex-1 bg-cake-primary hover:bg-cake-dark text-white"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-cake-primary text-cake-primary hover:bg-cake-primary/10"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedCakes.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-cake-text mb-8">
                You Might Also Like
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedCakes.map(relatedCake => (
                  <CakeCard key={relatedCake.id} cake={relatedCake} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CakeDetail;
