import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const PublicRoutes = () => {
  return isAuthenticated() ? <Navigate to='/dashboard' /> : <Outlet />;
};
