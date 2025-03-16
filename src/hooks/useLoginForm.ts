
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export const useLoginForm = (isAdmin = false) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login, userProfile } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    
    try {
      // Login with Firebase
      await login(data.email, data.password);
      
      // Wait a bit for userProfile to be fetched
      setTimeout(() => {
        // Check if admin login and if user has admin role
        if (isAdmin && userProfile?.role !== "admin") {
          toast({
            title: "Access denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
          navigate("/login");
        } else if (isAdmin && userProfile?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);
      
    } catch (error) {
      // Error handling is done in the login function in AuthContext
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit,
  };
};
