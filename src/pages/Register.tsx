
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/auth/RegistrationForm";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

const Register = () => {
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
          
          <RegistrationForm />
          <SocialLoginButtons />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
