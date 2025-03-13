
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="relative max-w-3xl w-full mx-auto"
    >
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for cakes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-6 rounded-full border-cake-border focus-visible:ring-cake-primary"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cake-text/60" />
        <Button 
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 rounded-full bg-cake-primary hover:bg-cake-dark text-white"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
