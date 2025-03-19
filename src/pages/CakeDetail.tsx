import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CakeCard from "@/components/CakeCard";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";

const CakeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" }); // State for new review
  const { userData, user } = useAuth();

  // Fetch cake details
  useEffect(() => {
    const fetchCake = async () => {
      try {
        setLoading(true);

        // Fetch cake document
        const cakeRef = doc(db, "products", id);
        const cakeDoc = await getDoc(cakeRef);

        if (cakeDoc.exists()) {
          const cakeData = {
            id: cakeDoc.id,
            ...cakeDoc.data(),
          };
          setCake(cakeData);
        } else {
          setError("Cake not found");
        }
      } catch (err) {
        console.error("Error fetching cake:", err);
        setError("Failed to load cake details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCake();
    }
  }, [id]);

  // Handle new review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!newReview.rating || !newReview.comment) {
      alert("Please provide a rating and comment.");
      return;
    }

    try {
      // Add new review to the product document
      const cakeRef = doc(db, "products", id);
      await updateDoc(cakeRef, {
        reviews: arrayUnion({
          userId: user.uid, // Replace with actual user ID
          userName: userData.name, // Replace with actual user name
          rating: newReview.rating,
          comment: newReview.comment,
          createdAt: new Date(),
        }),
      });

      // Refresh cake data to show the new review
      const cakeDoc = await getDoc(cakeRef);
      if (cakeDoc.exists()) {
        const cakeData = {
          id: cakeDoc.id,
          ...cakeDoc.data(),
        };
        setCake(cakeData);
      }

      // Clear the form
      setNewReview({ rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again.");
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Add cake to cart
  const handleAddToCart = () => {
    addToCart({ ...cake, quantity });
  };

  // Calculate average rating
  const averageRating =
    cake?.reviews?.reduce((sum, review) => sum + review.rating, 0) /
      cake?.reviews?.length || 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cake-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or cake not found state
  if (error || !id) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cake-text mb-4">
              {error || "Cake not found"}
            </h2>
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cake Image */}
            <div className="lg:w-1/2">
              <div className="aspect-square overflow-hidden rounded-lg shadow-md">
                <img
                  src={cake.imageURL}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Cake Details */}
            <div className="lg:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-cake-text mb-4">
                {cake.name}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray-500">
                  ({cake.reviews?.length || 0} reviews)
                </span>
              </div>

              <p className="text-xl font-bold text-cake-primary mb-6">
                ${cake.price.toFixed(2)}
              </p>

              <p className="text-cake-text/80 mb-8">{cake.description}</p>

              <div className="mb-8">
                <p className="font-medium text-cake-text mb-2">Category:</p>
                <Link
                  to={`/category/${cake.category}`}
                  className="inline-block px-4 py-2 bg-cake-background rounded-md text-cake-text hover:bg-cake-accent/20 transition-colors"
                >
                  {cake.category.charAt(0).toUpperCase() +
                    cake.category.slice(1)}
                </Link>
              </div>

              <div className="flex items-center mb-8">
                <p className="font-medium text-cake-text mr-4">Quantity:</p>
                <div className="flex items-center border border-cake-border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrementQuantity}
                    className="text-cake-text hover:text-cake-primary hover:bg-transparent"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={incrementQuantity}
                    className="text-cake-text hover:text-cake-primary hover:bg-transparent"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="flex-1 bg-cake-primary hover:bg-cake-dark text-white"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-cake-primary text-cake-primary hover:bg-cake-primary/10"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Review Section */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-cake-text mb-6">
                  Reviews
                </h2>

                {/* Display Reviews */}
                {cake.reviews?.length > 0 ? (
                  cake.reviews?.map((review, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex items-center mb-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium">
                          {review.rating}
                        </span>
                      </div>
                      <p className="text-cake-text/80">{review.comment}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {review?.userName} •{" "}
                        {new Date(review?.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-cake-text/80">No reviews yet.</p>
                )}

                {/* Add Review Form */}
                <form onSubmit={handleSubmitReview} className="mt-8">
                  <div className="mb-4">
                    <label className="block text-cake-text font-medium mb-2">
                      Rating
                    </label>
                    <select
                      value={newReview.rating}
                      onChange={(e) =>
                        setNewReview({
                          ...newReview,
                          rating: Number(e.target.value),
                        })
                      }
                      className="w-full p-2 border border-cake-border rounded-md"
                      required
                    >
                      <option value={0}>Select Rating</option>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} Star{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-cake-text font-medium mb-2">
                      Comment
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      className="w-full p-2 border border-cake-border rounded-md"
                      rows={4}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-cake-primary hover:bg-cake-dark text-white"
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CakeDetail;
