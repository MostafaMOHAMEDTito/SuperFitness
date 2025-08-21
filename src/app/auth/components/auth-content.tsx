import React from 'react';
import { Outlet } from 'react-router-dom';
import BannerAuth from './banner';
import NavbarLanguageSwitcher from '@/components/custom/navbar-lang-switcher';
import NavbarThemeSwitcher from '@/components/custom/navbar-theme-switcher';

export const AuthContent: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row relative z-40">
      {/* Banner on the left side */}
      <BannerAuth />

      {/* Outlet for nested routes on the right side */}
      <div className="w-full h-screen md:w-1/2 flex justify-center p-4 !overflow-auto">
        <div className="absolute top-4 start-4 z-50">
            <NavbarThemeSwitcher/>
            <NavbarLanguageSwitcher/>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthContent; 