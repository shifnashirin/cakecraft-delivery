import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "@/config/firebase"; // Firebase Firestore
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.warn("No orders found for user:", user.uid);
          setOrders([]);
          return;
        }

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({ title: "Error", description: "Could not fetch your orders", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  if (loading) {
    return <div className="text-center py-12">Loading your orders...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.length === 0 ? (
          <p className="text-center">You don't have any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <Card key={order.id}>
                <CardHeader>
                  <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                  <p>Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                </CardHeader>
                <CardContent>
                  <p>Status: {order.status}</p>
                  <p>Total: ${order.totalAmount?.toFixed(2)}</p>
                  <Button asChild className="mt-4">
                    <Link to={`/track-order/${order.id}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyOrders;
