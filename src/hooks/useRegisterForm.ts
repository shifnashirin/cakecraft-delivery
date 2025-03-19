
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as z from "zod";

export const registerFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export const useRegisterForm = (role) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phoneNumber: data.phone,
          password: data.password,
          role: role,
        }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }


        const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredential.user;
  
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          const userRole = idTokenResult.claims.role;
  
         if (userRole === "admin") {
            navigate("/admin/dashboard");
          }else if (userRole === "vendor"){
            navigate("/vendor/dashboard");
          } else {
            navigate("/");
          }
        }
      

      const result = await response.json();

      toast({
        title: "Registration successful",
        description: "you logged in successfully",
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      
      form.setValue("email", "");
      form.setValue("password", "");
      form.setValue("confirmPassword", "");

      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
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