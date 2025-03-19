
import React, { useState, useEffect } from "react";
import { User, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/auth/RegistrationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const [activeTab, setActiveTab] = useState<string>("customer");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cake-background">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-cake-text">Create an Account</h2>
            <p className="mt-2 text-sm text-cake-text/60">
              Join CakeDelight for sweet treats and special offers
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Customer</span>
              </TabsTrigger>
              <TabsTrigger value="vendor" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Vendor</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="customer">
              <RegistrationForm role="customer" />
            </TabsContent>
            
            <TabsContent value="vendor">
              <RegistrationForm role="vendor" />
            </TabsContent>
          </Tabs>
          {/* <SocialLoginButtons /> */}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
