
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
  totalItems: number;
}

const CartButton = ({ totalItems }: CartButtonProps) => {
  return (
    <Link 
      to="/cart" 
      className="relative inline-flex items-center justify-center"
    >
      <ShoppingCart className="h-6 w-6 text-cake-text hover:text-cake-primary transition-colors" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-cake-primary text-white text-xs font-bold rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
