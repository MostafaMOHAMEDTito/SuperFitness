import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslations } from "use-intl";

export default function SocialIcon() {
  // Translations
  const t = useTranslations();

  // Variables
  const socialIcons = [
    {
      icon: <FaFacebookF size={20} />,
      link: "#",
    },
    {
      icon: <FaGoogle size={20} />,
      link: "#",
    },
    {
      icon: <FaApple size={20} />,
      link: "#",
    },
  ];

  return (
    <div className="">
      {/* Or */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-zinc-800 dark:border-zinc-200" />
        <span className="mx-4 text-zinc-800 dark:text-main-foreground text-sm">{t("or")}</span>
        <hr className="flex-grow border-zinc-800 dark:border-zinc-200" />
      </div>

      {/* Login buttons via the media */}
      <div className="flex justify-center space-x-4 mb-4">
        {socialIcons.map((icon, index) => (
          <Link
            key={index}
            to={icon.link}
            className="w-11 h-11 flex items-center justify-center border border-zinc-800 dark:border-zinc-200 text-zinc-800 dark:text-main-foreground rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            {icon.icon}
          </Link>
        ))}
      </div>
    </div>
  );
}
