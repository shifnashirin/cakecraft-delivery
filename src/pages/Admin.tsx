import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Cake, ShoppingBag, LayoutDashboard, Users, Package } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InventoryTab from "@/components/admin/InventoryTab";
import OrdersTab from "@/components/admin/OrdersTab";
import UsersTab from "@/components/admin/UsersTab";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import DashboardTab from "@/components/admin/DashboardTab";

const Admin = () => {
  const { user, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cakes, setCakes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });

  const filteredCakes = cakes.filter(cake => 
    cake.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetch all data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const usersRef = collection(db, "users");
        const usersSnapshot = await getDocs(usersRef);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);

        // Fetch products
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCakes(productsData);

        // Fetch orders
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);

        // Calculate stats
        const totalUsers = usersData.length;
        const totalVendors = usersData.filter((user) => user?.role === "vendor").length;
        const totalCustomers = usersData.filter((user) => user?.role === "customer").length;
        const totalProducts = productsData.length;
        const totalOrders = ordersData.length;
        const pendingOrders = ordersData.filter((order) => order?.status === "pending").length;

        setStats({
          totalUsers,
          totalVendors,
          totalCustomers,
          totalProducts,
          totalOrders,
          pendingOrders,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch data. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [toast]);

  // Update product availability
  const handleUpdateAvailability = async (id, inStock) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { inStock });

      setCakes((prevCakes) =>
        prevCakes.map((cake) =>
          cake.id === id ? { ...cake, inStock } : cake
        )
      );

      toast({
        title: `Product ${inStock ? "available" : "unavailable"}`,
        description: `Product availability has been updated.`,
      });
    } catch (error) {
      console.error("Error updating product availability:", error);
      toast({
        title: "Error",
        description: "Failed to update product availability.",
        variant: "destructive",
      });
    }
  };

  // Update order status
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const orderRef = doc(db, "orders", id);
      await updateDoc(orderRef, { status });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status } : order
        )
      );

      toast({
        title: "Order status updated",
        description: `Order ${id} is now ${status}.`,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive",
      });
    }
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <Package className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Total Vendors</p>
                <h3 className="text-2xl font-bold">{stats.totalVendors}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <h3 className="text-2xl font-bold">{stats.totalCustomers}</h3>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <ShoppingBag className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-white border border-gray-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="inventory" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <Cake className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-cake-primary data-[state=active]:text-white">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="p-0 border-none">
            <DashboardTab orders={orders} users={users} cakes={cakes} />
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="p-0 border-none">
            <UsersTab users={users} />
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="p-0 border-none">
            <InventoryTab
              cakes={filteredCakes}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleUpdateAvailability={handleUpdateAvailability}
            />
          </TabsContent>

          {/* Orders Tab */}
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