/* eslint-disable react-refresh/only-export-components */
import { useEffect, type FC } from "react";
import {
  createBrowserRouter,
  useNavigate,
  type RouteObject,
} from "react-router-dom";
import HomePage from "./app/home/page";
import RootLayout from "@/components/Layout/root";
import LoginPage from "./app/auth/login/page";
import NotFound from "./app/not-found";
import AboutPage from "./app/about/page";
import ClassesPage from "./app/classes/page";
import HealthyPage from "./app/healthy/page";
import AuthRoutesGuard from "./guards/auth-routes-guard";
import AccountPage from "./app/account/page";
import RoutesGuard from "./guards/routes-guard";
import AuthLayout from "./app/auth/auth-layout";
import RegisterPage from "./app/auth/register/page";
import ForgetPasswordPage from "./app/auth/forget-password/page";

// Supported locales
export const SUPPORTED_LOCALES = ["en", "ar"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Storage key
export const LOCALE_STORAGE_KEY = "app-locale";

// Base routes without /:locale
const baseRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    element: <RoutesGuard />,
    children: [{ path: "account", element: <AccountPage /> }],
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "classes",
    element: <ClassesPage />,
  },
  {
    path: "healthy",
    element: <HealthyPage />,
  },
  {
    path: "auth/*",
    element: <AuthLayout />,
    children: [
      {
        element: <AuthRoutesGuard />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "forget-password", element: <ForgetPasswordPage /> },
        ],
      },
    ],
  },
];

// Get default locale
const getDefaultLocale = (): SupportedLocale => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (saved && SUPPORTED_LOCALES.includes(saved as SupportedLocale)) {
      return saved as SupportedLocale;
    }
  }
  return "en";
};

// Component that handles locale injection and redirection
const LocaleRedirect: FC<{ path?: string }> = ({ path }) => {
  const navigate = useNavigate();
  useEffect(() => {
    // Strip basename (/SuperFitness) from path for logic
    const rawPath = path || window.location.pathname;
    const currentPath = rawPath.replace(/^\/SuperFitness/, ""); 
    const cleanPath = currentPath.replace(/^\/+/, "");
    const pathSegments = cleanPath.split("/");
    const firstSegment = pathSegments[0];
    const defaultLocale = getDefaultLocale();

    if (!cleanPath) {
      navigate(`/${defaultLocale}`, { replace: true });
      return;
    }

    if (!SUPPORTED_LOCALES.includes(firstSegment as SupportedLocale)) {
      const newPath = `/${defaultLocale}${currentPath}`;
      navigate(newPath, { replace: true });
    }
  }, [path, navigate]);

  return null;
};

// Create a localized router
function createLocalizedRouter(children: RouteObject[]) {
  return createBrowserRouter(
    [
      {
        path: "/",
        element: <LocaleRedirect />,
      },
      {
        // Dynamic locale route, matches all nested paths
        path: "/:locale/*",
        element: <RootLayout />,
        loader: ({ params }) => {
          if (!SUPPORTED_LOCALES.includes(params.locale as SupportedLocale)) {
            throw new Error("Unsupported locale");
          }
          return { locale: params.locale };
        },
        errorElement: <NotFound />,
        children: [
          ...children,
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
      // Catch-all for any non-localized path
      {
        path: "*",
        element: <LocaleRedirect />,
      },
    ],
    {
      basename: "/SuperFitness", // ✅ Important for GitHub Pages
    }
  );
}

// Router
const router = createLocalizedRouter(baseRoutes);

export default router;
