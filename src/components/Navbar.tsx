
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CartButton from "@/components/navbar/CartButton";
import UserMenu from "@/components/navbar/UserMenu";
import DesktopNavLinks from "@/components/navbar/DesktopNavLinks";
import MobileMenu from "@/components/navbar/MobileMenu";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { totalItems } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, userProfile, logoutUser } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in based on Auth context
    setIsLoggedIn(!!currentUser);
    setUserRole(userProfile?.role || null);
  }, [currentUser, userProfile]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUserRole(null);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
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
        <DesktopNavLinks userRole={userRole} />

        <div className="flex items-center space-x-4">
          <CartButton totalItems={totalItems} />
          
          <UserMenu 
            isLoggedIn={isLoggedIn} 
            userRole={userRole} 
            handleLogout={handleLogout} 
          />

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
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        userRole={userRole}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
    </header>
  );
};

export default Navbar;
