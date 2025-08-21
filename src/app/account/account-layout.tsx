/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import AppProviders, { localeLoader } from "@/components/providers/app-providers";

export default function RootLayout() {
  return (
    <AppProviders>
        <div className="w-full bg-red-100 py-10" ></div>
      <Outlet />
    </AppProviders>
  );
}

export { localeLoader };
