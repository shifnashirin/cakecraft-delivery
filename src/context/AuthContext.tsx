import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  User
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { auth, db } from "../config/firebase"; // Import Firebase instance
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, fullName: string, phone: string) => Promise<User>;
  googleSignIn: () => Promise<User>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile,setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await fetchUserProfile(user.uid); // Fetch user data from Firestore
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const fetchUserProfile = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        setUserProfile(userSnap.data()); // Store Firestore user data in state
      } else {
        console.log("No user profile found!");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // 🔹 LOGIN with Firebase and Send Token to Backend
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      // const role = idToken.claims.role;
      console.log(user)
      toast({
        title: "Login successful",
        description: "Welcome back!",
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

  // 🔹 REGISTER with Firebase and Backend
  const register = async ( name:String, email:String, phoneNumber:String, password:String) => {
    try {
      // const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // const user = userCredential.user;
      // const idToken = await user.getIdToken();

      // Send user details to backend
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ name, email, phoneNumber, password }),
      });

      if (!response.ok) throw new Error("Failed to register user");
      console.log(response)
      toast({
        title: "Registration successful",
        description: "Welcome aboard!",
      });

      return response;
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      throw error;
    }
  };

  // 🔹 GOOGLE SIGN-IN with Firebase and Backend
  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          fullName: user.displayName || "",
          phone: "",
          email: user.email,
          uid: user.uid,
        }),
      });

      toast({
        title: "Login successful",
        description: "Welcome to CakeDelight!",
      });

      return user;
    } catch (error: any) {
      toast({
        title: "Google Sign-In failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  // 🔹 LOGOUT
  const logoutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    register,
    googleSignIn,
    logoutUser,
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
