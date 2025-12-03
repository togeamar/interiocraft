import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('type'); // Login.jsx saves status as 'type'

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // User is authenticated but doesn't have the right role
    // Redirect to home or appropriate dashboard based on their actual role
    if (userRole === 'admin') {
        return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === 'customer') {
        return <Navigate to="/customer-dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
