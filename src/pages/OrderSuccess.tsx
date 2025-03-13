
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Generate a random order number
    const orderNumber = Math.floor(10000000 + Math.random() * 90000000);
    
    // Store it in session storage so it persists during the current session
    sessionStorage.setItem("orderNumber", orderNumber.toString());
  }, []);
  
  const orderNumber = sessionStorage.getItem("orderNumber") || "12345678";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-cake-background">
        <div className="container max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-green-100 rounded-full">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-cake-text mb-4">
              Order Successful!
            </h1>
            
            <p className="text-cake-text/70 mb-8">
              Thank you for your order. Your order has been received and is now being processed.
            </p>
            
            <div className="bg-cake-background rounded-lg p-6 mb-8">
              <p className="text-cake-text/70 mb-2">Order Number:</p>
              <p className="text-xl font-bold text-cake-text mb-6">
                #{orderNumber}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-cake-primary text-cake-primary hover:bg-cake-primary/10"
                  asChild
                >
                  <Link to="/track-order">Track Order</Link>
                </Button>
                <Button 
                  className="bg-cake-primary hover:bg-cake-dark text-white"
                  asChild
                >
                  <Link to="/">Continue Shopping</Link>
                </Button>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-cake-text mb-4">
                What's Next?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-cake-primary/20 rounded-full mb-4 text-cake-primary">
                    1
                  </div>
                  <h3 className="font-medium text-cake-text mb-2">
                    Order Confirmation
                  </h3>
                  <p className="text-sm text-cake-text/70">
                    You will receive an email confirmation shortly.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-cake-primary/20 rounded-full mb-4 text-cake-primary">
                    2
                  </div>
                  <h3 className="font-medium text-cake-text mb-2">
                    Order Preparation
                  </h3>
                  <p className="text-sm text-cake-text/70">
                    Our bakers will start preparing your delicious cake.
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 flex items-center justify-center bg-cake-primary/20 rounded-full mb-4 text-cake-primary">
                    3
                  </div>
                  <h3 className="font-medium text-cake-text mb-2">
                    Delivery
                  </h3>
                  <p className="text-sm text-cake-text/70">
                    Your cake will be delivered to you at the scheduled time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
