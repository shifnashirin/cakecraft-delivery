
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-cake-dark text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">CakeDelight</h3>
            <p className="text-white/80 mb-6">
              Delicious cakes delivered to your doorstep. Made with premium ingredients and love.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-cake-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-cake-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-cake-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-white/80 hover:text-white transition-colors">
                  Cake Categories
                </Link>
              </li>
              <li>
                <Link to="/special-occasions" className="text-white/80 hover:text-white transition-colors">
                  Special Occasions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
                <span className="text-white/80">
                  123 Bakery Street, Cake City, CC 12345
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="text-white/80">
                  info@cakedelight.com
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-white/80">Monday - Friday</span>
                <span className="text-white">9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Saturday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Sunday</span>
                <span className="text-white">10:00 AM - 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} CakeDelight. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
