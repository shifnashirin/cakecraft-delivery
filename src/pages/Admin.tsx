
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Cake, ShoppingBag, Users, Calendar, Edit, Trash2, Plus, Search, 
  CheckCircle, XCircle, AlertTriangle, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cakes as initialCakes } from "@/lib/data";

const Admin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cakes, setCakes] = useState(initialCakes);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-cake-primary text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-cake-text/60 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-cake-text">{cakes.length}</p>
            </div>
            <div className="bg-cake-primary/10 p-3 rounded-full">
              <Cake className="h-8 w-8 text-cake-primary" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-cake-text/60 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-cake-text">{orders.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <ShoppingBag className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-cake-text/60 text-sm">Total Customers</p>
              <p className="text-3xl font-bold text-cake-text">158</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between">
            <div>
              <p className="text-cake-text/60 text-sm">Pending Orders</p>
              <p className="text-3xl font-bold text-cake-text">
                {orders.filter(order => order.status === "pending" || order.status === "processing").length}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>
        
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
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold text-cake-text">Cake Inventory</h2>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search cakes..." 
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button className="bg-cake-primary hover:bg-cake-dark text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Cake
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cake</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCakes.map((cake) => (
                      <tr key={cake.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                src={cake.image} 
                                alt={cake.name} 
                                className="h-10 w-10 rounded-md object-cover" 
                                onError={(e) => {
                                  e.currentTarget.src = "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&w=800&h=600";
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-cake-text">{cake.name}</div>
                              <div className="text-xs text-gray-500">{cake.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cake-text">${cake.price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cake-text">
                            {cake.category || "General"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-cake-text">
                            {cake.rating} 
                            <span className="ml-1 text-yellow-400">★</span>
                            <span className="ml-1 text-xs text-gray-500">({cake.reviews})</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          {cake.isAvailable !== false ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Available
                            </span>
                          ) : (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Unavailable
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {cake.isAvailable !== false ? (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                                onClick={() => handleUpdateAvailability(cake.id, false)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleUpdateAvailability(cake.id, true)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredCakes.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-cake-text/60">No cakes found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="p-0 border-none">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-cake-text">Recent Orders</h2>
                
                <div className="flex gap-4">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search orders..." className="pl-10" />
                  </div>
                  
                  <Button variant="outline" className="border-gray-200 text-cake-text">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-cake-text">{order.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cake-text">{order.customerName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cake-text">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cake-text">${order.total.toFixed(2)}</div>
                          <div className="text-xs text-gray-500">{order.items} items</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                            ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${order.status === 'delivered' ? 'bg-purple-100 text-purple-800' : ''}
                          `}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            {order.status === 'pending' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                                onClick={() => handleUpdateOrderStatus(order.id, 'processing')}
                              >
                                Process
                              </Button>
                            )}
                            {order.status === 'processing' && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 px-2 text-green-600 border-green-200 hover:bg-green-50"
                                onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                              >
                                Complete
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 px-2 text-cake-text border-gray-200 hover:bg-gray-50"
                            >
                              View
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
