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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order Details</h1>

        <Card>
          <CardHeader>
            <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
            <p>Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
          </CardHeader>
          <CardContent>
            <p>Status: {order.status}</p>
            <p>Total Amount: ${order.totalAmount?.toFixed(2)}</p>

            <h2 className="text-xl font-bold mt-4">Items</h2>
            <ul className="list-disc pl-5">
              {order.items?.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>

            <h2 className="text-xl font-bold mt-4">Shipping Address</h2>
            <p>{order.shippingAddress?.street}</p>
            <p>
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}
            </p>

            <h2 className="text-xl font-bold mt-4">Payment Info</h2>
            <p>Method: {order.paymentMethod}</p>
            <p>Status: {order.paymentStatus}</p>

            <Button asChild className="mt-4">
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
