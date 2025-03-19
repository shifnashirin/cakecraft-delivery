// components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  const { handleSignOut } = useAuth();

  const handleGoToHome = () => {
    navigate("/");
  };

  const handleSignOutClick = () => {
    handleSignOut();
    navigate("/");
  };

  return (
    <nav className="bg-cake-primary text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Brand Logo/Name */}
        <div className="text-xl font-bold">My Cake Shop</div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="bg-white text-cake-primary hover:bg-gray-100"
            onClick={handleGoToHome}
          >
            Go to Home
          </Button>
          <Button
            variant="outline"
            className="bg-white text-cake-primary hover:bg-gray-100"
            onClick={handleSignOutClick}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;