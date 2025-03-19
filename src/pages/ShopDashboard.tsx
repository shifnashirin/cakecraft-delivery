import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  LayoutDashboard,
  Cake,
  Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import CreateProduct from "./Createproduct";
import Navbar from "@/components/NavbarVendor";

const ShopDashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, userData } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    revenue: 0,
    totalItemsSold: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch orders and products from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch orders
        const ordersRef = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersRef);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter orders based on vendor's products
        const vendorOrders = ordersData.filter((order) =>
          order.items.some((item) => userData?.myProducts?.includes(item.cakeId))
        );
        setOrders(vendorOrders);

        // Fetch products
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const productsData = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter products based on userData.myProducts
        const vendorProducts = productsData.filter((product) =>
          userData?.myProducts?.includes(product.id)
        );
        setProducts(vendorProducts);

        // Calculate stats
        const totalOrders = vendorOrders.length;
        const pendingOrders = vendorOrders.filter(
          (order) => order.status === "pending"
        ).length;
        const completedOrders = vendorOrders.filter(
          (order) => order.status === "delivered"
        ).length;
        const revenue = vendorOrders.reduce(
          (sum, order) => sum + TotalAmount(order.items),
          0
        );
        const totalItemsSold = vendorOrders.reduce(
          (sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
          0
        );

        setStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          revenue,
          totalItemsSold,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  // Calculate total amount for an order
  const TotalAmount = (items) => {
    let total = 0;
    items?.forEach((item) => {
      total += item.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
  };

  // Calculate monthly sales data
  const calculateMonthlySales = () => {
    const monthlySales = Array(12).fill(0); // Initialize an array for 12 months

    orders.forEach((order) => {
      const orderDate = new Date(order.orderDate);
      const month = orderDate.getMonth(); // Get month (0-11)
      monthlySales[month] += TotalAmount(order.items); // Add to the respective month
    });

    return monthlySales.map((sales, index) => ({
      name: new Date(2023, index).toLocaleString("default", { month: "short" }), // Month name (e.g., Jan, Feb)
      sales: parseFloat(sales.toFixed(2)), // Format sales to 2 decimal places
    }));
  };

  const salesData = calculateMonthlySales();

  // Calculate top-selling products
  const calculateTopSellingProducts = () => {
    const productSales = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (productSales[item.productId]) {
          productSales[item.productId] += item.quantity;
        } else {
          productSales[item.productId] = item.quantity;
        }
      });
    });

    return Object.entries(productSales)
      .map(([productId, quantity]) => ({
        productId,
        quantity,
        product: products.find((product) => product.id === productId),
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5 products
  };

  const topSellingProducts = calculateTopSellingProducts();

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
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Update product availability
  const handleUpdateAvailability = async (id, inStock) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, { inStock });

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, inStock } : product
        )
      );
    } catch (error) {
      console.error("Error updating product availability:", error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
    <Navbar />
    <div className="container mx-auto px-4 py-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-cake-text">Vendor Dashboard</h1>
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
          Add New Product
        </Button>
      </div>

      {/* Stats Cards */}
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
            <h3 className="text-2xl font-bold">
              ${stats.revenue.toLocaleString()}
            </h3>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="orders">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="products">
            <Cake className="h-4 w-4 mr-2" />
            Products
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
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

          {/* Top Selling Products */}
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {topSellingProducts.map((product) => (
                <div key={product.productId} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.product?.imageURL}
                      alt={product.product?.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{product.product?.name}</p>
                      <p className="text-sm text-gray-500">{product.product?.category}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{product?.quantity} sold</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Orders */}
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                    <p className="text-sm text-gray-500">{new Date(order?.createdAt).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm text-gray-500">${TotalAmount(order?.items)}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
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
                        <div className="text-sm font-medium text-gray-900">
                          {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${order.totalAmount?.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateOrderStatus(order.id, "delivered")
                          }
                        >
                          Mark as Delivered
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products">
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Your Products</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={product.imageURL}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price?.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUpdateAvailability(
                              product.id,
                              !product.inStock
                            )
                          }
                        >
                          {product.inStock
                            ? "Mark as Out of Stock"
                            : "Mark as In Stock"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <Card className="p-6 bg-white shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Shop Settings</h3>
            <p className="text-gray-500">
              This section will allow you to update your shop information,
              business hours, and payment settings. (Coming soon)
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Product Modal */}
      {isModalOpen && (
        <CreateProduct
          onClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
    </div>
  );
};

export default ShopDashboard;