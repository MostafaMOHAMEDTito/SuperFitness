/* eslint-disable react-refresh/only-export-components */
import { Outlet } from "react-router-dom";
import AppProviders, { localeLoader } from "@/components/providers/app-providers";
import ChatButton from "@/components/custom/chatbot-button";
import Header from "./header";
import Footer from "./footer";

export default function RootLayout() {
  return (
    <AppProviders>
      {/* Header */}
      <Header />
      {/* Outlet */}
      <Outlet />
      <ChatButton />
      {/* <Footer /> */}
      <Footer />
    </AppProviders>
  );
}

export { localeLoader };
