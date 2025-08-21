import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  Button
} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTranslations } from "use-intl";
import { MdOutlineLanguage } from "react-icons/md";
import { LOCALE_STORAGE_KEY } from "@/routers";

// Locales
const locales = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

export default function NavbarLanguageSwitcher() {
  // Translations
  const t = useTranslations();

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
    }
  }, [locale, currentLocale]);

  // Handlers
  function changeLocale(newLocale: string) {
    if (newLocale === currentLocale) return;
    
    setCurrentLocale(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);

    // Get the path after the locale
    const pathWithoutLocale = location.pathname
      .split('/')
      .slice(2)
      .join('/');

    // Construct new path with new locale
    const newPath = `/${newLocale}/${pathWithoutLocale}`;
    navigate(newPath);
  }

  return (
    <DropdownMenu>
      {/* Trigger */}
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent hover:bg-transparent dark:text-white text-zinc-800">
          <MdOutlineLanguage size={28} className="text-2xl"/>
        </Button>
      </DropdownMenuTrigger>

      {/* Content */}
      <DropdownMenuContent className="w-40" align="start">
        {/* Label */}
        <DropdownMenuLabel>{t("select-language")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Group */}
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}