import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

const ShopDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    // Check if user is logged in and is a shop owner
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "shopOwner") {
      navigate("/login?type=shopOwner");
      return;
    }

    // Fetch shop statistics
    fetchShopStats();
    
    // Fetch orders
    fetchOrders();
  }, [navigate]);

  const fetchShopStats = () => {
    // In a real app, this would be an API call
    // For now, using mock data
    setStats({
      totalOrders: 124,
      pendingOrders: 18,
      completedOrders: 106,
      revenue: 8750
    });
  };

  const fetchOrders = () => {
    // In a real app, this would be an API call
    // For now, using mock data
    setOrders([
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2023-06-15",
        total: 45.99,
        status: "delivered"
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2023-06-14",
        total: 32.50,
        status: "processing"
      },
      {
        id: "ORD-003",
        customer: "Robert Johnson",
        date: "2023-06-14",
        total: 78.25,
        status: "pending"
      },
      {
        id: "ORD-004",
        customer: "Emily Davis",
        date: "2023-06-13",
        total: 54.75,
        status: "delivered"
      },
      {
        id: "ORD-005",
        customer: "Michael Wilson",
        date: "2023-06-12",
        total: 29.99,
        status: "delivered"
      }
    ]);
  };

  const salesData = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4500 },
    { name: "May", sales: 6000 },
    { name: "Jun", sales: 5500 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "text-green-600";
      case "processing":
        return "text-blue-600";
      case "pending":
        return "text-yellow-600";
      case "canceled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cake-text">Shop Dashboard</h1>
        <Button onClick={() => navigate("/shop/products/new")}>
          Add New Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 flex items-center space-x-4 bg-white shadow-sm">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-4 bg-white shadow-sm">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Orders</p>
            <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-4 bg-white shadow-sm">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Completed Orders</p>
            <h3 className="text-2xl font-bold">{stats.completedOrders}</h3>
          </div>
        </Card>

        <Card className="p-6 flex items-center space-x-4 bg-white shadow-sm">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold">${stats.revenue.toLocaleString()}</h3>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="settings">Shop Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.total}</p>
                      <p className={`text-sm ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                  View All Orders
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => navigate("/shop/products/new")}>
                  Add New Product
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/shop/orders/pending")}>
                  View Pending Orders
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/shop/settings")}>
                  Update Shop Information
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate("/shop/promotions")}>
                  Create Promotion
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">All Orders</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${order.total}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "delivered" ? "bg-green-100 text-green-800" :
                          order.status === "processing" ? "bg-blue-100 text-blue-800" :
                          order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/shop/orders/${order.id}`)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card className="p-6 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Your Products</h3>
              <Button onClick={() => navigate("/shop/products/new")}>
                Add New Product
              </Button>
            </div>
            <p className="text-gray-500">
              This section will display your product catalog with options to edit, delete, and manage inventory.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Shop Settings</h3>
            <p className="text-gray-500">
              This section will allow you to update your shop information, business hours, and payment settings.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShopDashboard;
