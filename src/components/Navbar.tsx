
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { totalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in (in a real app, use proper authentication)
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    setIsLoggedIn(!!role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

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
          {userRole === "admin" && (
            <Link 
              to="/admin" 
              className="text-cake-primary hover:text-cake-dark transition-colors font-medium"
            >
              Admin Dashboard
            </Link>
          )}
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
              {isLoggedIn ? (
                <>
                  {userRole === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/checkout">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
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
            {userRole === "admin" && (
              <Link 
                to="/admin" 
                className="text-cake-primary hover:text-cake-dark transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="text-cake-text hover:text-cake-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-cake-text hover:text-cake-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <button 
                className="text-left text-red-500 hover:text-red-700 transition-colors font-medium py-2 flex items-center"
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
