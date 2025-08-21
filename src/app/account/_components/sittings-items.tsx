import { useLocale, useTranslations } from "use-intl";
import { useTheme } from "@/context/them-context";
import { cn } from "@/lib/utils/utils";
import LanguageSwitcher from "@/components/language-swicher";
import ThemeSwitcher from "@/components/custom/theme-switcher";
import { Palette, RefreshCcw } from "lucide-react";
import { TfiWorld } from "react-icons/tfi";
import { BsShieldLock } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { logoutAction } from "@/lib/actions/logout.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ChangePasswordDialog from "./change-password-dialog";

export default function SittingsItems() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  // Navigation
  const navigate = useNavigate();

  // Theme
  const { theme } = useTheme();

  // Logout mutation
  const { mutate: logout } = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      toast.success(t("logged-out-successfully"));
      localStorage.removeItem("token");
      navigate(`/${locale}/auth/login`);
    },
    onError: () => {
      toast.error(t("failed-to-logout"));
    },
  });

  // Variables
  const items = [
    {
      title: t("change-password"),
      icon: (
        <ChangePasswordDialog>
          <RefreshCcw size={22} />
        </ChangePasswordDialog>
      ),
      onClick: () => {},
    },
    {
      title: t("select-language"),
      icon: <TfiWorld size={22} />,
      onClick: () => {},
    },
    {
      title: t("mode"),
      icon: <Palette size={22} />,
      onClick: () => {},
    },
    {
      title: t("security"),
      icon: <BsShieldLock size={22} />,
      onClick: () => {},
    },
    {
      title: t("privacy-policy"),
      icon: <MdOutlinePrivacyTip size={22} />,
      onClick: () => {},
    },
    {
      title: t("help"),
      icon: <IoHelpBuoyOutline size={22} />,
      onClick: () => {},
    },
    {
      title: t("logout"),
      icon: <AiOutlineLogout size={22} />,
      onClick: () => logout(),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-10 relative z-20">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "bg-transparent border border-zinc-800 dark:border-main-foreground p-4 rounded-xl flex flex-col items-center justify-center gap-2 min-h-40",
            index === 6 && "col-start-2 col-end-3"
          )}
        >
          {/* Icon */}
          <div
            onClick={item.onClick}
            className="text-main p-2 rounded-lg cursor-pointer"
          >
            {item.icon}
          </div>

          {/* Title */}
          <h2 className="text-lg font-baloo font-semibold text-zinc-800 dark:text-main-foreground capitalize">
            {item.title === t("mode") ? (
              <>
                {item.title} (<span className="text-main px-1">{t(theme)}</span>
                )
              </>
            ) : (
              item.title
            )}
          </h2>

          {/* If the item is select-language, show the current language switcher*/}
          {item.title === t("select-language") && (
            <p className="text-lg font-baloo font-bold text-zinc-800 dark:text-main-foreground capitalize">
              (<LanguageSwitcher />)
            </p>
          )}

          {/* If the item is mode, show the mode switcher */}
          {item.title === t("mode") && <ThemeSwitcher />}
        </div>
      ))}
    </div>
  );
}
