
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, DollarSign, Star, Clock, CheckCircle, XCircle } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

interface AdminDashboardProps {
  orders: Order[];
}

const AdminDashboard = ({ orders }: AdminDashboardProps) => {
  // Calculate revenue
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  // Count orders by status
  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const processingOrders = orders.filter(order => order.status === "processing").length;
  const completedOrders = orders.filter(order => order.status === "completed" || order.status === "delivered").length;
  const canceledOrders = orders.filter(order => order.status === "canceled").length;
  
  // Mock data for monthly revenue chart
  const revenueData = [
    { name: "Jan", revenue: 2400 },
    { name: "Feb", revenue: 1398 },
    { name: "Mar", revenue: 9800 },
    { name: "Apr", revenue: 3908 },
    { name: "May", revenue: 4800 },
    { name: "Jun", revenue: 3800 },
    { name: totalRevenue > 5000 ? "Jul (Current)" : "Jul", revenue: totalRevenue > 5000 ? 5000 : totalRevenue }
  ];
  
  // Data for order status chart
  const orderStatusData = [
    { name: "Pending", value: pendingOrders, color: "#FFC107" },
    { name: "Processing", value: processingOrders, color: "#2196F3" },
    { name: "Completed", value: completedOrders, color: "#4CAF50" },
    { name: "Canceled", value: canceledOrders, color: "#F44336" }
  ];
  
  // Mock data for ratings
  const ratings = {
    average: 4.7,
    total: 158,
    distribution: [
      { stars: 5, count: 120 },
      { stars: 4, count: 25 },
      { stars: 3, count: 10 },
      { stars: 2, count: 2 },
      { stars: 1, count: 1 }
    ]
  };
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orders.length}</div>
                <p className="text-xs text-muted-foreground">
                  +{Math.floor(Math.random() * 10)}% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  +{Math.floor(Math.random() * 15)}% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ratings</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{ratings.average}</div>
                <p className="text-xs text-muted-foreground">
                  {ratings.total} customer reviews
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Order Status</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <div className="mr-1 h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span className="text-xs">Pending: {pendingOrders}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-1 h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-xs">Completed: {completedOrders}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <div className="mr-1 h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-xs">Processing: {processingOrders}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-1 h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="text-xs">Canceled: {canceledOrders}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>Revenue trend over the past months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Distribution of orders by status</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={orderStatusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {orderStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Status Breakdown</CardTitle>
              <CardDescription>Detailed view of all orders by status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-yellow-700 flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-yellow-500" />
                      Pending
                    </h3>
                    <span className="text-2xl font-bold text-yellow-600">{pendingOrders}</span>
                  </div>
                  <p className="text-sm text-yellow-600">Orders awaiting processing</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-green-700 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      Completed
                    </h3>
                    <span className="text-2xl font-bold text-green-600">{completedOrders}</span>
                  </div>
                  <p className="text-sm text-green-600">Successfully delivered orders</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-red-700 flex items-center">
                      <XCircle className="h-5 w-5 mr-2 text-red-500" />
                      Canceled
                    </h3>
                    <span className="text-2xl font-bold text-red-600">{canceledOrders}</span>
                  </div>
                  <p className="text-sm text-red-600">Orders that were canceled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-lg border bg-background">
                  <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                  <p className="text-3xl font-bold text-cake-primary">${totalRevenue.toFixed(2)}</p>
                </div>
                
                <div className="p-4 rounded-lg border bg-background">
                  <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
                  <p className="text-3xl font-bold text-cake-primary">
                    ${orders.length ? (totalRevenue / orders.length).toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">Monthly Revenue Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ratings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Ratings</CardTitle>
              <CardDescription>Overview of customer feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg border">
                    <h3 className="text-lg font-semibold mb-2">Average Rating</h3>
                    <div className="text-5xl font-bold text-yellow-500 flex items-center gap-2">
                      {ratings.average} <Star className="h-8 w-8" />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Based on {ratings.total} reviews</p>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-lg font-semibold mb-4">Rating Distribution</h3>
                  {ratings.distribution.map((item) => (
                    <div key={item.stars} className="mb-3">
                      <div className="flex items-center mb-1">
                        <span className="w-8 text-sm">{item.stars} ★</span>
                        <div className="flex-1 h-4 mx-2 bg-background border rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400" 
                            style={{ width: `${(item.count / ratings.total) * 100}%` }}
                          ></div>
                        </div>
                        <span className="w-8 text-sm text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
