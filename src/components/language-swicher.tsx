import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Button
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALE_STORAGE_KEY } from "../routers";

// Locales
const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function LanguageSwitcher() {

  // Navigation
  const { locale } = useParams<{ locale: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // States
  const [currentLocale, setCurrentLocale] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (saved && locales.some((l) => l.code === saved)) return saved;
    }
    return locale || "en";
  });

  // Side effects
  useEffect(() => {
    if (locale && locales.some((l) => l.code === locale) && locale !== currentLocale) {
      setCurrentLocale(locale);
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      document.documentElement.setAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    }
  }, [locale, currentLocale]);  

  // Handlers
  function changeLocale(newLocale: string) {
    if (newLocale === currentLocale) return;

    setCurrentLocale(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    document.documentElement.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");

    const pathWithoutLocale = location.pathname
      .split('/')
      .slice(2)
      .join('/');

    const newPath = `/${newLocale}/${pathWithoutLocale}`;
    navigate(newPath);
  }
  
  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent text-main font-baloo font-bold text-lg focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-none px-2 py-0">
          {locale === "en" ? "English" : "العربية"}
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent className="w-40" align="start">
          {/* Items */}
          {locales.map(({ code, label }) => (
            <DropdownMenuItem
              key={code}
              className="capitalize"
              onSelect={() => changeLocale(code)}
            >
              {label}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}