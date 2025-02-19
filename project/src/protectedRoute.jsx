import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const correctPassword = `${import.meta.env.VITE_ADMIN_PASSWORD}`; 

  const userPassword = prompt("Please enter the password:");

  if (userPassword !== correctPassword) {
    alert("Incorrect password. Redirecting to home.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
