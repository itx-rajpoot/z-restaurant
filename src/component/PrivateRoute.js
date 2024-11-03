import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function PrivateRoute({ Component }) {
  const { isAuthentication } = useAuthContext();

  // If not authenticated, redirect to login
  if (!isAuthentication) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, render the passed component
  return <Component />;
}
