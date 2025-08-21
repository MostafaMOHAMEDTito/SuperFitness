import AnimatedLine from "@/components/common/animated-line";
import { cn } from "@/lib/utils/utils";
import { Mail, Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLocale, useTranslations } from "use-intl";

export default function Footer() {
  const location = useLocation();
  const isAuthPage = location.pathname.includes("/auth");

  // Translation
  const locale = useLocale();
  const t = useTranslations();

  // Formatter
  const formatTime = (time: string) => {
    return new Intl.DateTimeFormat(locale, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(`2020-01-01T${time}`));
  };

  return (
    <>
      <div className={cn(isAuthPage && "hidden")}>
        <AnimatedLine />
      </div>
      <footer
        className={cn(
          "text-muted-foreground py-10 px-6",
          isAuthPage && "hidden"
        )}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 items-start">
          {/* Logo and tagline */}
          <div className="space-y-3">
            <img
              src="/assets/images/logo/logo.png"
              alt="Super Fitness Logo"
              className="w-24"
            />
            <p className="text-sm">{t("tagline")}</p>
          </div>

          {/* Contact us */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">{t("contact_us")}</h4>
            <div className="flex items-center gap-3">
              <div className="border border-text-muted-foreground rounded-full p-2 w-[40px] h-[40px] flex items-center justify-center ">
                <Phone size={16} className="text-muted-foreground" />
              </div>
              <span>+91 123 456 789</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-mtext-muted-foreground rounded-full p-2 w-[40px] h-[40px] flex items-center justify-center ">
                <Mail size={16} className="text-muted-foreground" />
              </div>
              <span>info@gmail.com</span>
            </div>
          </div>

          {/* Gym timings */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">{t("gym_timing")}</h4>
            <p>
              {t("mon_fri")}: {formatTime("08:00")}-{formatTime("22:00")}
            </p>
            <p>
              {t("sat_sun")}: {formatTime("08:00")}-{formatTime("21:00")}
            </p>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-lg">{t("location")}</h4>
            <p>{t("address")}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
