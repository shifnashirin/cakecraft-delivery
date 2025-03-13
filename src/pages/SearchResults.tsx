
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search } from "lucide-react";
import { cakes } from "@/lib/data";
import CakeCard from "@/components/CakeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  
  const filteredCakes = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return cakes.filter(cake => 
      cake.name.toLowerCase().includes(searchTerm) || 
      cake.description.toLowerCase().includes(searchTerm) ||
      cake.category.toLowerCase().includes(searchTerm)
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-cake-background py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-cake-text mb-6">
              Search Results for "{query}"
            </h1>
            
            <SearchBar />
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {filteredCakes.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-cake-text/30 mb-4" />
              <h2 className="text-2xl font-bold text-cake-text mb-4">
                No cakes found
              </h2>
              <p className="text-cake-text/70 mb-8">
                We couldn't find any cakes matching your search.
              </p>
              <Link 
                to="/" 
                className="text-cake-primary hover:underline"
              >
                Browse all cakes
              </Link>
            </div>
          ) : (
            <>
              <p className="mb-6 text-cake-text/70">
                Found {filteredCakes.length} cakes matching your search.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCakes.map(cake => (
                  <CakeCard key={cake.id} cake={cake} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
