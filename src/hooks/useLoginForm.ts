import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase"; // Import Firebase auth
import * as z from "zod";

// Define the login form schema using Zod
export const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Infer the type of the login form data
export type LoginFormData = z.infer<typeof loginFormSchema>;

// Custom hook for handling the login form
export const useLoginForm = (isAdmin = false) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user, role } = useAuth(); // Use the role from AuthContext

  // Initialize the form using react-hook-form
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      if (user) {
        // Get the user's ID token to check their role
        const idTokenResult = await user.getIdTokenResult();
        const userRole = idTokenResult.claims.role; // Assuming the role is stored in the token claims

        // Redirect based on the user's role
        if (isAdmin && userRole !== "admin") {
          toast({
            title: "Access denied",
            description: "You don't have admin privileges.",
            variant: "destructive",
          });
          await auth.signOut(); // Sign out the user if they don't have admin privileges
          navigate("/login");
        } else if (isAdmin && userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
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