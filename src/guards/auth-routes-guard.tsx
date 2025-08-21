import { Navigate, Outlet } from "react-router-dom";

const AuthRoutesGuard = () => {
  const isAuthenticated = localStorage.getItem("token");

  if (isAuthenticated) {
    return <Navigate to={`/`} replace />;
  }

  return <Outlet />;
};

export default AuthRoutesGuard;
