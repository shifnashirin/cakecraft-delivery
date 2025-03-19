import React, { useState, useEffect } from "react";
import { db } from "@/config/firebase";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import CakeCard from "./CakeCard";

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        
        // Create a query to get the top 3 products by order count
        const q = query(
          collection(db, "products"),
          //where("inStock", "==", true),
          orderBy("ordersCount", "desc"),
          limit(3)
        );
        
        const querySnapshot = await getDocs(q);
        const productsData = [];
        
        querySnapshot.forEach((doc) => {
          productsData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        setBestSellers(productsData);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
        setError("Failed to load best sellers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="py-16 bg-cake-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-cake-text mb-4">
          Best Sellers
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cake-text"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-8">{error}</div>
        ) : bestSellers.length === 0 ? (
          <div className="text-center py-8 text-gray-600">No best sellers available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {bestSellers.map((product) => (
              <CakeCard key={product.id} cake={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSellers;