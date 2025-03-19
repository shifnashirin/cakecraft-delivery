import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderRef = doc(db, "orders", id);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) {
          console.error("Order not found");
          setOrder(null);
        } else {
          setOrder({ id: orderSnap.id, ...orderSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p>Order not found.</p>
        <Button asChild>
          <Link to="/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  const TotalAmount = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
            <p className="text-sm text-gray-600">
              Placed on {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Status and Total */}
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                Status: <span className="text-blue-600">{order.status}</span>
              </p>
              <p className="text-lg font-semibold">
                Total: <span className="text-green-600">${TotalAmount(order.items)}</span>
              </p>
            </div>

            {/* Order Items */}
            <div>
              <h2 className="text-xl font-bold mb-4">Items</h2>
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <img
                      src={item.imageURL}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${item.price?.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <p className="text-gray-700">{order.shippingAddress?.street}</p>
              <p className="text-gray-700">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
              </p>
            </div>

            {/* Payment Info */}
            <div>
              <h2 className="text-xl font-bold mb-4">Payment Info</h2>
              <p className="text-gray-700">Method: {order.paymentMethod}</p>
              <p className="text-gray-700">Status: {order.paymentStatus}</p>
            </div>

            {/* Back to Orders Button */}
            <Button asChild className="mt-6 w-full sm:w-auto">
              <Link to="/my-orders">Back to Orders</Link>
            </Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;