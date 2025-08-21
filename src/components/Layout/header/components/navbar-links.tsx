import type { Dispatch, SetStateAction } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLocale, useTranslations } from "use-intl";

type NavLinsProps = {
  smallScreen?: boolean;
  openMenu?: Dispatch<SetStateAction<boolean>>;
};
export default function NavbarLinks({ smallScreen, openMenu }: NavLinsProps) {
  // Translations
  const t = useTranslations();

  // Navgation
  const location = useLocation();
  const pathname = location.pathname;
  const locale = useLocale();

  const headerLinks = [
    { href: "/", label: t("home") },
    { href: "/classes", label: t("classes") },
    { href: "/about", label: t("about_us") },
    { href: "/healthy", label: t("healthy") },
  ];

  // Helper function
  const isActiveLink = (href: string) => {
    // removing locale from pathname if exist
    const normalizedPathname = pathname.replace(`/${locale}`, "") || "/";

    // Normalize href for comparison
    const normalizedHref = href === "/" ? "/" : href.replace(/\/$/, "");

    // Check if the normalized pathname matches the href
    return (
      normalizedPathname === normalizedHref ||
      normalizedPathname === `${normalizedHref}/`
    );
  };

  return (
    <div>
      {/* Navigation */}
      <ul className="flex flex-col md:flex-row gap-x-5 lg:gap-x-6 justify-center py-3 md:py-0">
        {headerLinks.map((link) => (
          <li key={link.href} className="py-3 px-6 md:p-0">
            <NavLink
              onClick={() => {
                if (smallScreen && openMenu) openMenu(false);
              }}
              className={`${
                isActiveLink(link.href) ? "text-main" : "text-zinc-800 dark:text-main-foreground"
              }
                font-medium hover:text-main transition-colors text-sm lg:text-base`}
              to={`/${locale}${link.href === "/" ? "" : link.href}`}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
