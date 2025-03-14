
import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DesktopNavLinksProps {
  userRole: string | null;
}

const DesktopNavLinks = ({ userRole }: DesktopNavLinksProps) => {
  return (
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
      {userRole === "admin" ? (
        <Link 
          to="/admin" 
          className="text-cake-primary hover:text-cake-dark transition-colors font-medium"
        >
          Admin Dashboard
        </Link>
      ) : (
        <Link 
          to="/login" 
          className="flex items-center space-x-1 text-cake-text hover:text-cake-primary transition-colors font-medium"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Admin Login</span>
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavLinks;
