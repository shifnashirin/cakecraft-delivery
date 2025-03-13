
import React, { createContext, useContext, useState, useEffect } from "react";
import { Cake } from "@/lib/data";
import { toast } from "sonner";

interface CartItem {
  cake: Cake;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (cake: Cake) => void;
  removeFromCart: (cakeId: string) => void;
  updateQuantity: (cakeId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (cake: Cake) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.cake.id === cake.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item => 
          item.cake.id === cake.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
        toast.success(`Added another ${cake.name} to your cart`);
        return updatedItems;
      } else {
        toast.success(`${cake.name} added to cart`);
        return [...prevItems, { cake, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (cakeId: string) => {
    setItems(prevItems => {
      const removedItem = prevItems.find(item => item.cake.id === cakeId);
      if (removedItem) {
        toast.info(`${removedItem.cake.name} removed from cart`);
      }
      return prevItems.filter(item => item.cake.id !== cakeId);
    });
  };

  const updateQuantity = (cakeId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(cakeId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.cake.id === cakeId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce((sum, item) => sum + (item.cake.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
