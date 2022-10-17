import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};
