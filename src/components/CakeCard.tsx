
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
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
      </Link>
      
      <div className="p-4">
        <Link to={`/cake/${cake.id}`}>
          <h3 className="text-xl font-semibold text-cake-text mb-2 hover:text-cake-primary transition-colors">
            {cake.name}
          </h3>
        </Link>
        
        <div className="flex items-center mb-3">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 font-medium">{cake.rating}</span>
          <span className="ml-2 text-sm text-gray-500">
            ({cake.reviews} reviews)
          </span>
        </div>
        
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
