import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase"; // Make sure you have this firebase config file
import CakeCard from "@/components/CakeCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define categories array
const categories = [
  "Chocolate Cakes",
  "Fruit Cake",
  "Wedding Cakes",
  "Vegan Cakes",
  "Special Cake"
];

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log(id)
  // Find the category by id/name
  const category = categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, '-') === id
  );
  
  useEffect(() => {
    const fetchCakesByCategory = async () => {
      try {
        setLoading(true);
  
        // Create a reference to the "products" collection
        const cakesRef = collection(db, "products");
  
        // Determine category based on `id`
        let category = "";
        if (id === "chocolate") {
          category = "Choclate Cakes"; // Match Firestore spelling
        }else if (id === "fruit"){
          category = "Fruit Cake";
        }else if (id === "wedding"){
          category = "Wedding Cakes";
        }else if (id === "vegan"){
          category = "Vegan Cakes";
        }else if (id === "special"){
          category = "Special Cake";
        }
  
        let q;
        if (category) {
          // Query with category filter
          q = query(cakesRef, where("category", "==", category));
        } else {
          // Fetch all if no category is provided
          q = cakesRef;
        }
  
        // Execute the query
        const querySnapshot = await getDocs(q);
  
        console.log("Query Snapshot Size:", querySnapshot.size);
        
        // Map the documents to an array
        const cakesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(cakesData)
        setCakes(cakesData);
      } catch (err) {
        console.error("Error fetching cakes:", err);
        setError("Failed to load cakes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    if (id) {
      fetchCakesByCategory();
    }
  }, [id]);
  
  
  

  if (!id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cake-text mb-4">Category not found</h2>
            <Link to="/" className="text-cake-primary hover:underline">
              Return to home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-cake-background py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm mb-4">
              <Link to="/" className="text-cake-text/70 hover:text-cake-primary">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-cake-text/50" />
              <Link to="/categories" className="text-cake-text/70 hover:text-cake-primary">
                Categories
              </Link>
              <ChevronRight className="w-4 h-4 mx-2 text-cake-text/50" />
              <span className="text-cake-primary">{category}</span>
            </div>
            
            <h1 className="text-3xl font-bold text-cake-text">
              {category}
            </h1>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cake-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium text-red-600 mb-4">{error}</h2>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-cake-primary text-white rounded hover:bg-cake-primary/90"
              >
                Try Again
              </button>
            </div>
          ) : cakes.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-cake-text mb-4">
                No cakes found in this category
              </h2>
              <p className="text-cake-text/70 mb-8">
                We're constantly adding new cakes, please check back later.
              </p>
              <Link 
                to="/" 
                className="text-cake-primary hover:underline"
              >
                Browse other categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cakes.map(cake => (
                <CakeCard key={cake.id} cake={cake} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;