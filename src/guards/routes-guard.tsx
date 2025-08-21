import { Navigate, Outlet } from "react-router-dom";
import { useLocale } from "use-intl";

const RoutesGuard = () => {
    const locale = useLocale();
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to={`/${locale}/auth/login`} replace />;
    }

    return <Outlet />;
}

export default RoutesGuard;
