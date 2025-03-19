
import React from "react";
import { Link } from "react-router-dom";

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
      {userRole === "admin" && (
        <Link
          to="/admin/dashboard"
          className="text-cake-primary hover:text-cake-dark transition-colors font-medium"
        >
          Admin Dashboard
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavLinks;
