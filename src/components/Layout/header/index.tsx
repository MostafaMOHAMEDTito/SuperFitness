import { Button } from "@/components/ui/button";
import { CgMenuRightAlt } from "react-icons/cg";
import { useEffect, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import NavbarLinks from "./components/navbar-links";
import { useLocale, useTranslations } from "use-intl";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import NavbarThemeSwitcher from "@/components/custom/navbar-theme-switcher";
import NavbarLanguageSwitcher from "@/components/custom/navbar-lang-switcher";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Navigation
  const navigate = useNavigate();
  const location = useLocation();

  const token = window.localStorage.getItem("token");

  // States
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [islogin, setIslogin] = useState<boolean>(false);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (token) {
      setIslogin(true);
    }
  }, [token]);

  // Functions
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Variables
  const isAuthPage = location.pathname.includes("/auth");

  // Side effects
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4  transition-all duration-300 ${
        scrolled ? " bg-white dark:bg-zinc-900 shadow-md" : "bg-transparent"
      } 
        ${isAuthPage ? "hidden" : ""}
        `}
    >
      {/* Header logo */}
      <NavLink to={"/"}>
        <img
          src={`${import.meta.env.BASE_URL}/assets/images/logo/logo.png`}
          alt="logo"
          width={86}
          height={86}
          className="object-cover"
        />
      </NavLink>

      {/* Navigation */}
      {!isSmallScreen ? (
        <NavbarLinks />
      ) : (
        <div
          className={`fixed inset-0 z-50 bg-muted bg-opacity-70 ${
            isMenuOpen ? "block md:hidden" : "hidden md:hidden"
          }`}
        >
          <div className={`w-[65%] bg-muted-foreground overflow-hidden`}>
            {/* Logo and Close button */}
            <div className="flex justify-between items-center gap-6 px-6 py-2 ">
              {/* Header logo */}
              <NavLink to={"/"}>
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }/assets/images/logo/logo.png`}
                  alt="logo"
                  width={86}
                  height={86}
                  className="object-cover"
                />
              </NavLink>

              {/* Close button */}
              <Button
                onClick={toggleMenu}
                className="size-10 bg-muted-foreground border text-storm-900 p-0 me-1 rounded-full hover:bg-gray-100"
              >
                <HiMiniXMark className="text-2xl" />
              </Button>
            </div>

            {/* NavLinks */}
            <NavbarLinks smallScreen={isSmallScreen} openMenu={setIsMenuOpen} />
          </div>
        </div>
      )}

      {/* Header icons */}
      <div className="flex gap-2 justify-end">
        <div className="flex items-center">
          <NavbarLanguageSwitcher />
          <NavbarThemeSwitcher />
        </div>
        {/* If login */}
        {!islogin ? (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                navigate("auth/login");
                toggleMenu();
              }}
              variant={"default"}
            >
              {t("login")}
            </Button>

            <Link to="auth/register">
              <Button onClick={toggleMenu} variant={"outline"}>
                {t("sign-up")}
              </Button>
            </Link>
          </div>
        ) : (
          <Link
            to={`/${locale}/account`}
            className="flex items-center mx-2 text-main"
          >
            <FaRegUser size={22} />
          </Link>
        )}

        {/* Menubar icon */}
        <Button
          onClick={toggleMenu}
          size={"icon"}
          variant={"default"}
          className="md:hidden"
        >
          <CgMenuRightAlt size={28} className="text-muted" />
        </Button>
      </div>
    </header>
  );
}
