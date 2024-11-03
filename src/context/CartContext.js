import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config/firebase'
import { message } from 'antd'
const CartContext  = createContext()

export default function CartContextProvider({children}) {
    const {user ,isAuthentication} = useAuthContext()
  const [cartItems, setCartItems] = useState([]);
  const MAX_CART_ITEMS = 10;
  const [isProcesingId,setIsProcessingId] = useState(null)

  const fetchCart = async () => {
    if (!isAuthentication) return; // Ensure the user is authenticated before fetching the cart

    const cartDoc = await getDoc(doc(firestore, "carts", user.uid));
    if (cartDoc.exists()) {
        const items = cartDoc.data().items || [];
        setCartItems(items.slice(0, MAX_CART_ITEMS));
       message.info("Cart loaded! Ready for a shopping spree? 🛒");
    } else {
        setCartItems([]);
        message.info("Your cart is empty. Time to fill it up with goodies! 🎁");
    }
};
  
   // Add item to cart
   const addToCart = async (product) => {
    setIsProcessingId(product.id)
    console.log("isAuthentication123",isAuthentication);
    
  
      if (!isAuthentication || !user) {
          message.warning("Oops! You need to log in before you can add awesome items to your cart!");
          console.warn("User must be authenticated to add items to the cart.");
    setIsProcessingId(null)
  
          return;
      }
  
      const existingProductIndex = cartItems.findIndex(item => item.id === product.id);
      let updatedCart = [];
  
      if (existingProductIndex !== -1) {
          // Product exists, update quantity
          updatedCart = cartItems.map((item, index) =>
              index === existingProductIndex ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item
          );
        } else {
          // New product
          if (cartItems.length >= MAX_CART_ITEMS) {
            message.warning("Whoa! Your cart is full! Maybe time for a checkout spree? 🏃‍♂️");
            console.warn("Cart is full. Cannot add more items.");
            setIsProcessingId(null);
            return;
          }
          updatedCart = [...cartItems, { ...product, quantity: 1 }].slice(0, MAX_CART_ITEMS);
          message.success("Added to cart! 🎉 Get ready for the shopping party!");
        }
        
        setCartItems(updatedCart);
        await setDoc(doc(firestore, "carts", user.uid), { items: updatedCart });
        message.info("Updated quantity! More of the good stuff! 😋");
        setIsProcessingId(null);
  
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;
    try {
      const cartRef = doc(firestore, "carts", user.uid);
      // Retrieve the current cart items from Firestore
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const currentCartItems = cartSnapshot.data().items || [];
        // Filter out the item to be removed
        const updatedCartItems = currentCartItems.filter(
          (item) => item.id !== itemId
        );
        setCartItems(updatedCartItems);
  
        // Update the Firestore cart document with the new array
        await updateDoc(cartRef, {
          items: updatedCartItems,
        });
  
        message.success("Item removed from cart");
      }
    } catch (error) {
      message.error("Failed to remove item from cart");
    }
  };

useEffect(() => {
    if (isAuthentication && user) {
        fetchCart();
    }
   
  }, [isAuthentication, user]);
  return (
    <CartContext.Provider   value={{addToCart,removeFromCart,isProcesingId}}>
      {children}
    </CartContext.Provider>
  )
}

export const UseCartContext =()=> useContext(CartContext)