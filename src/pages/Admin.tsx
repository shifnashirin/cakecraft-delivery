
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cake, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cakes as initialCakes } from "@/lib/data";
import AdminStats from "@/components/admin/AdminStats";
import InventoryTab from "@/components/admin/InventoryTab";
import OrdersTab from "@/components/admin/OrdersTab";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cakes, setCakes] = useState(initialCakes);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-1001", customerName: "John Doe", date: "2023-05-15", status: "completed", total: 89.97, items: 3 },
    { id: "ORD-1002", customerName: "Sarah Smith", date: "2023-05-16", status: "processing", total: 54.99, items: 1 },
    { id: "ORD-1003", customerName: "Michael Brown", date: "2023-05-16", status: "pending", total: 149.98, items: 2 },
    { id: "ORD-1004", customerName: "Emma Wilson", date: "2023-05-17", status: "processing", total: 64.99, items: 1 },
    { id: "ORD-1005", customerName: "David Lee", date: "2023-05-18", status: "delivered", total: 129.97, items: 3 },
  ]);
  
  useEffect(() => {
    // Check if user is admin (in a real app, use proper authentication)
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);
  
  const handleUpdateAvailability = (id: string, isAvailable: boolean) => {
    setCakes(cakes.map(cake => 
      cake.id === id ? { ...cake, isAvailable } : cake
    ));
    
    toast({
      title: `Cake ${isAvailable ? 'now available' : 'marked as unavailable'}`,
      description: `${cakes.find(c => c.id === id)?.name} has been updated.`,
    });
  };
  
  const filteredCakes = cakes.filter(cake => 
    cake.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleUpdateOrderStatus = (id: string, status: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order ${id} is now ${status}.`,
    });
  };

  const pendingOrderCount = orders.filter(order => 
    order.status === "pending" || order.status === "processing"
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-cake-primary text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <AdminStats 
          cakeCount={cakes.length} 
          orderCount={orders.length} 
          pendingOrderCount={pendingOrderCount} 
        />
        
        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="inventory" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <Cake className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="p-0 border-none">
            <InventoryTab 
              cakes={filteredCakes} 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              handleUpdateAvailability={handleUpdateAvailability} 
            />
          </TabsContent>
          
          <TabsContent value="orders" className="p-0 border-none">
            <OrdersTab 
              orders={orders} 
              handleUpdateOrderStatus={handleUpdateOrderStatus} 
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
