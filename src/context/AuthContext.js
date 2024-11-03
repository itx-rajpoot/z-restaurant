import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { auth, firestore } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toastify } from "../config/global";

const Auth = createContext();

const initialState = { isAuthentication: false, user: {} ,isAdmin:false};

const reducer = (AuthState, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return { ...AuthState, isAuthentication: true, user: payload.user,isAdmin: payload.isAdmin };
    case "SET_LOGGED_OUT":
      return initialState;
    default:
      return AuthState;
  }
};

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [AuthState, dispatch] = useReducer(reducer, initialState);  
  const [isApploading, setIsApploading] = useState(true);
  // console.log("user",user.uid);
  
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        readUserProfile(uid);
      } else {
        dispatch({ type: "SET_LOGGED_OUT" });
        setIsApploading(false);
      }
    });
  }, []);

  const readUserProfile = async (uid) => {
    const docRef = doc(firestore, "users", uid);
    const docSnap = await getDoc(docRef);
       
    if (docSnap.exists()) {
       const userdata = docSnap.data();
     const isAdmin = userdata.role.includes("admin")
    // console.log("User data:", userdata);
    // console.log("isAdmin:", isAdmin);
      dispatch({ type: "SET_LOGGED_IN", payload: { user: userdata ,isAdmin} });
      setIsApploading(false);
    } else {
      // setIsApploading(false);
      console.log("No such user profile!");
    }
  };

    const handleLogout = () => {
      signOut(auth).then(() => {
        dispatch({ type: "SET_LOGGED_OUT" });
        toastify("Successfully logged out", "success");
        navigate("/auth/login");
      }).catch(() => {
        toastify("Error in logout", "error");
      });
    };

  return (
    <Auth.Provider value={{ ...AuthState, dispatch, handleLogout, isApploading, setIsApploading }}>
      {children}
    </Auth.Provider>
  );
}

export const useAuthContext = () => useContext(Auth);
    