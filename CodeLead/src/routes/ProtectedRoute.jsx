import { Navigate } from 'react-router';
import React from 'react'
import useLoginStore from '../store/auth';


const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;