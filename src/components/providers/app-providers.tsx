/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IntlProvider } from "use-intl";
import { useLoaderData } from "react-router-dom";
import en from "@/locales/messages/en.json";
import ar from "@/locales/messages/ar.json";
import ThemeProvider from "@/context/them-context";
import { Toaster } from "sonner";

const messages = { en, ar };

const queryClient = new QueryClient();

interface LoaderData {
  locale: string;
}

export function localeLoader({
  params,
}: {
  params: { locale?: string };
}): LoaderData {
  const supportedLocales = ["en", "ar"];
  const locale =
    params.locale && supportedLocales.includes(params.locale)
      ? params.locale
      : "en";
  return { locale };
}

const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { locale } = useLoaderData() as LoaderData;
  const typedLocale = (locale === "en" || locale === "ar" ? locale : "en") as
    | "en"
    | "ar";

  return (

    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={typedLocale} messages={messages[typedLocale]}>
        <ThemeProvider>
          {children}
          <Toaster/>
        </ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
