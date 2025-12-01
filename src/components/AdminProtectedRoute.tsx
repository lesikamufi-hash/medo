import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './SessionContextProvider'; // Import useSession

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return <div>Chargement de l'authentification Admin...</div>; // Show loading state
  }

  // If no user or user is not an admin, redirect to admin login
  if (!user || user.role !== 'admin') {
    console.warn(`AdminProtectedRoute: User not authenticated or not an admin. Current user role: ${user?.role}. Redirecting to /admin.`);
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;