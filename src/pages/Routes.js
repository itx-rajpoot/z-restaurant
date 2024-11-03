import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Frontend from "./Frontend";
// import Header from "../component/Header" 
import Authentication from "./Authentication";
import { useAuthContext } from '../context/AuthContext';
import Dashboard from "./Dashboard"
import PrivateRoute from '../component/PrivateRoute';

export default function Index() {
  const {isAuthentication,isAdmin}= useAuthContext()
  return (
    <>
   
      <main>
        <Routes>
          <Route path="/*" element={<Frontend />} />
          <Route path="auth/*" element={isAuthentication ? <Navigate to="/home" /> : <Authentication />} />      
          <Route path="dashboard/*"  element={
              isAuthentication && isAdmin ? (
                <PrivateRoute Component={Dashboard} />
              ) : (
                <Navigate to="/home" />  // Redirect non-admins to home
              )
            }  /> 
                
          </Routes>
          
         
      </main>
    </>
  );
}
