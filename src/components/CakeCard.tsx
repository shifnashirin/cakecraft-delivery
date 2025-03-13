
import React from "react";
import { Link } from "react-router-dom";
import { Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Cake } from "@/lib/data";

interface CakeCardProps {
  cake: Cake;
}

const CakeCard: React.FC<CakeCardProps> = ({ cake }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/cake/${cake.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={cake.image}
          alt={cake.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-cake-primary text-white px-2 py-1 rounded-md font-medium">
          ${cake.price.toFixed(2)}
        </div>
        
        {cake.tags && cake.tags.includes('bestseller') && (
          <div className="absolute top-3 left-3 bg-cake-accent text-white px-2 py-1 rounded-full text-xs font-medium">
            Bestseller
          </div>
        )}
        {cake.tags && cake.tags.includes('trending') && (
          <div className="absolute top-3 left-3 bg-cake-primary text-white px-2 py-1 rounded-full text-xs font-medium">
            Trending
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/cake/${cake.id}`}>
          <h3 className="text-xl font-semibold text-cake-text mb-2 hover:text-cake-primary transition-colors">
            {cake.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{cake.rating}</span>
          <span className="ml-2 text-sm text-gray-500">
            ({cake.reviews} reviews)
          </span>
        </div>
        
        {cake.deliveryTime && (
          <p className="text-xs text-cake-text/60 mb-3">
            <Calendar className="w-3 h-3 inline-block mr-1" />
            {cake.deliveryTime} delivery
          </p>
        )}
        
        {cake.availableSizes && (
          <div className="mb-3 flex flex-wrap gap-1">
            {cake.availableSizes.map((size) => (
              <span key={size} className="text-xs bg-cake-background px-2 py-1 rounded-full border border-cake-border">
                {size}
              </span>
            ))}
          </div>
        )}
        
        <Button 
          className="w-full bg-cake-primary hover:bg-cake-dark text-white"
          onClick={() => addToCart(cake)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CakeCard;
