
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "firebase/auth";
import { 
  onAuthStateChange, 
  getCurrentUser,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logout
} from "../services/authService";
import { userApi } from "../services/apiService";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, fullName: string, phone: string) => Promise<User>;
  googleSignIn: () => Promise<User>;
  logoutUser: () => Promise<void>;
  userProfile: any | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setCurrentUser(user);
      setLoading(false);
      
      // If user is logged in, fetch their MongoDB profile
      if (user) {
        fetchUserProfile();
      } else {
        setUserProfile(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchUserProfile = async () => {
    try {
      const profile = await userApi.getProfile();
      setUserProfile(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Don't show toast here as the user might not be registered in MongoDB yet
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const user = await loginWithEmailAndPassword(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to CakeDelight!",
      });
      return user;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (email: string, password: string, fullName: string, phone: string) => {
    try {
      // First create Firebase auth user
      const user = await registerWithEmailAndPassword(email, password);
      
      // Then register in MongoDB with additional details
      await userApi.registerUser({ fullName, phone });
      
      toast({
        title: "Registration successful",
        description: "Welcome to CakeDelight!",
      });
      
      return user;
    } catch (error: any) {
      let errorMessage = "An error occurred during registration";
      
      // Enhanced error handling for Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please use a different email or try logging in.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      
      // Register or update user in MongoDB
      try {
        await userApi.registerUser({ 
          fullName: user.displayName || "", 
          phone: "" 
        });
      } catch (error) {
        // Ignore errors as the user might already be registered
        console.log("User might already be registered");
      }
      
      toast({
        title: "Login successful",
        description: "Welcome to CakeDelight!",
      });
      
      return user;
    } catch (error: any) {
      toast({
        title: "Google sign-in failed",
        description: error.message || "An error occurred during sign-in",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setCurrentUser(null);
      setUserProfile(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    googleSignIn,
    logoutUser,
    userProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
