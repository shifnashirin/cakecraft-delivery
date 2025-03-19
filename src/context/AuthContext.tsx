import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/config/firebase';

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  role: string | null;
  handleSignOut: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  handleSignOut: async () => {},
});

// Define props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const idTokenResult = await user.getIdTokenResult();
          setRole(idTokenResult.claims.role as string || ''); 
        } catch (error) {
          console.error("Error getting user role:", error);
        }
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className='fixed top-0 left-0 w-full h-full bg-slate-900 flex items-center justify-center z-50'>
        <p className='text-center text-white flex items-center justify-center'>Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => useContext(AuthContext);