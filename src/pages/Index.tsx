
import React from "react";
import HeroSlider from "@/components/HeroSlider";
import CategoryList from "@/components/CategoryList";
import BestSellers from "@/components/BestSellers";
import SpecialOccasions from "@/components/SpecialOccasions";
import SearchBar from "@/components/SearchBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSlider />
        
        <div className="bg-white py-8 shadow-md relative z-10">
          <div className="container mx-auto px-4">
            <SearchBar />
          </div>
        </div>
        
        <CategoryList />
        <BestSellers />
        <SpecialOccasions />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
