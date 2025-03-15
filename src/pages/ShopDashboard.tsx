
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Store, ShoppingBag, Package, Clock, LayoutDashboard } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

const ShopDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([
    { id: "ORD-1001", customerName: "John Doe", date: "2023-05-15", status: "completed", total: 89.97, items: 3 },
    { id: "ORD-1002", customerName: "Sarah Smith", date: "2023-05-16", status: "processing", total: 54.99, items: 1 },
    { id: "ORD-1003", customerName: "Michael Brown", date: "2023-05-16", status: "pending", total: 149.98, items: 2 },
    { id: "ORD-1004", customerName: "Emma Wilson", date: "2023-05-17", status: "processing", total: 64.99, items: 1 },
  ]);
  
  useEffect(() => {
    // Check if user is shop owner (in a real app, use proper authentication)
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "shopOwner" && userRole !== "admin") {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);
  
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
  
  const completedOrderCount = orders.filter(order => 
    order.status === "completed" || order.status === "delivered"
  ).length;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-cake-primary text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Shop Dashboard</h1>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-cake-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
              <p className="text-xs text-cake-text/60">Total orders placed with your shop</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
              <Clock className="h-4 w-4 text-cake-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrderCount}</div>
              <p className="text-xs text-cake-text/60">Orders waiting to be processed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
              <Package className="h-4 w-4 text-cake-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedOrderCount}</div>
              <p className="text-xs text-cake-text/60">Successfully fulfilled orders</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <div className="text-cake-primary">$</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-cake-text/60">Revenue from all orders</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="shop" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <Store className="h-4 w-4 mr-2" />
              Shop Profile
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="p-0 border-none">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(order => (
                        <tr key={order.id} className="border-b hover:bg-cake-background/30">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customerName}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="p-0 border-none">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Items</th>
                        <th className="text-right py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-cake-background/30">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.customerName}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">{order.items}</td>
                          <td className="py-3 px-4 text-right">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              order.status === 'completed' ? 'bg-green-100 text-green-800' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'delivered' ? 'bg-purple-100 text-purple-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <select 
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              className="border rounded p-1 text-sm w-full"
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="delivered">Delivered</option>
                              <option value="canceled">Canceled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="shop" className="p-0 border-none">
            <Card>
              <CardHeader>
                <CardTitle>Shop Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium mb-1">Shop Name</label>
                      <input type="text" className="w-full p-2 border rounded" defaultValue="Cake Delight Shop" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input type="email" className="w-full p-2 border rounded" defaultValue="shop@cakedelight.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input type="tel" className="w-full p-2 border rounded" defaultValue="(123) 456-7890" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Address</label>
                      <input type="text" className="w-full p-2 border rounded" defaultValue="123 Bakery St" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Shop Description</label>
                    <textarea 
                      className="w-full p-2 border rounded min-h-[100px]"
                      defaultValue="We specialize in custom cakes and pastries for all occasions."
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      className="bg-cake-primary hover:bg-cake-dark text-white"
                      onClick={() => {
                        toast({
                          title: "Profile updated",
                          description: "Your shop profile has been updated successfully.",
                        });
                      }}
                    >
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopDashboard;
