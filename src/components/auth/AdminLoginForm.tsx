import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useNavigate , Link} from "react-router-dom";

// Form validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const VendorLoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    setError("");
  
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
  
      const user = userCredential.user;
  
      // Fetch user document from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
  
      if (!userDocSnap.exists() || userDocSnap.data().role !== "vendor") {
        // If user does not exist in Firestore or is not a vendor, log them out
        await auth.signOut();
        setError("Account not authorized as vendor. Please contact support.");
        setIsLoading(false);
        return;
      }
  
      // Successfully logged in as vendor
      console.log("Vendor logged in:", user.uid);
      navigate("/vendor/dashboard"); // Redirect to vendor dashboard
  
    } catch (error) {
      console.error("Login error:", error);
  
      // Handle specific Firebase auth errors
      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password");
          break;
        case "auth/too-many-requests":
          setError("Too many failed login attempts. Try again later.");
          break;
        default:
          setError("Failed to sign in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Vendor Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    placeholder="vendor@cakedelight.com"
                    className="pl-10 border-cake-border focus-visible:ring-cake-primary"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-cake-text">Vendor Password</FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-cake-text/40" />
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 border-cake-border focus-visible:ring-cake-primary"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="w-full bg-cake-primary hover:bg-cake-dark text-white"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Vendor Sign in"}
        </Button>
        <div className="text-center mt-4">
          <p className="text-sm text-cake-text/60">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cake-primary hover:text-cake-dark transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default VendorLoginForm;