
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-cake-light shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-cake-primary">
            CakeDelight
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-cake-text hover:text-cake-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/categories" 
            className="text-cake-text hover:text-cake-primary transition-colors font-medium"
          >
            Categories
          </Link>
          <Link 
            to="/special-occasions" 
            className="text-cake-text hover:text-cake-primary transition-colors font-medium"
          >
            Special Occasions
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-cake-text hover:text-cake-primary transition-colors"
              >
                <User className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/login">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register">Register</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-cake-text hover:text-cake-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-2 pb-4 bg-cake-light animate-slide-in-right">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-cake-text hover:text-cake-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/categories" 
              className="text-cake-text hover:text-cake-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/special-occasions" 
              className="text-cake-text hover:text-cake-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Special Occasions
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
