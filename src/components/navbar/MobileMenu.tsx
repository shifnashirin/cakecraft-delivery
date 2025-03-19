
import React from "react";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  userRole: string | null;
  isLoggedIn: boolean;
  handleLogout: () => void;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const MobileMenu = ({ 
  isOpen, 
  userRole, 
  isLoggedIn, 
  handleLogout, 
  setIsMobileMenuOpen 
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
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
            to="/admin/dashboard" 
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
            <Link 
              to="/login?type=admin" 
              className="text-cake-text hover:text-cake-primary transition-colors font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Login
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
  );
};

export default MobileMenu;
