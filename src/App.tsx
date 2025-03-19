
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import  AuthProvider  from "@/context/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AdminRoute from "@/components/auth/AdminRoute";
import VendorRoute from "@/components/auth/VendorRoute";
import Index from "./pages/Index";
import CakeDetail from "./pages/CakeDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import SpecialOccasionsPage from "./pages/SpecialOccasionsPage";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import CreateProduct from "./pages/Createproduct";
import ShopDashboard from "./pages/ShopDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
       <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cake/:id" element={<CakeDetail />} />
              {/* <Route path="/ShopDashboard" element={<ShopDashboard />} /> */}
              <Route path="/track-order/:id" element={<OrderDetails />} />
              <Route path="/cart" element={<Cart />} />
              {/* <Route path="/Createproduct" element={<CreateProduct />} /> */}
              <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
              <Route path="/checkout/success/:orderId" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/special-occasions" element={<SpecialOccasionsPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/my-orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
              <Route path="/admin/dashboard" element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path="/vendor/dashboard" element={<VendorRoute><ShopDashboard /></VendorRoute>} />
              
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
