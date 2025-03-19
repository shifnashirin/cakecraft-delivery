import React, { useState, useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
} from "lucide-react";

const DashboardTab = ({ orders, users, cakes }) => {
  const TotalAmount = (items: any[]) => {
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
      sales: sales.toFixed(2), // Format sales to 2 decimal places
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
        product: cakes.find((cake) => cake.id === productId),
      }))
      // .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5 products
  };

  const topSellingProducts = calculateTopSellingProducts();

  // Calculate user growth
  const calculateUserGrowth = () => {
    const monthlyUsers = Array(12).fill(0); // Initialize an array for 12 months

    users.forEach((user) => {
      const userDate = new Date(user.createdAt);
      const month = userDate.getMonth(); // Get month (0-11)
      monthlyUsers[month] += 1; // Increment user count for the respective month
    });

    return monthlyUsers.map((count, index) => ({
      name: new Date(2023, index).toLocaleString("default", { month: "short" }), // Month name (e.g., Jan, Feb)
      users: count,
    }));
  };

  const userGrowthData = calculateUserGrowth();



  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold overflow-clip truncate">
              $
              {orders
                .reduce((sum, order) => sum + TotalAmount(order.items), 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cakes.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Selling Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topSellingProducts.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={product.product?.imageURL}
                    alt={product.product?.name}
                    className="h-10 w-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{product.product?.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.product?.category}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {product?.quantity} sold
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    Order #{order.id.substring(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  ${TotalAmount(order.items)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
