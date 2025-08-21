
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "use-intl";


export default function UserDropdownMenu() {
  // Translations
  const t = useTranslations();

  // Navigation
  const navigate = useNavigate();

  const dropdownMenuItems = [
    {
      title: t("profile"),
      handleClick: () => navigate("/profile"),
    },
    {
      title: t("log-out"),
    },
  ];

  return (
    <div
      className={`hover:bg-accent hover:text-accent-foreground transition-colors text-sm size-10 rounded-md flex justify-center items-center  `}
    >
      <DropdownMenu>
        {/* Dropdown trigger button*/}
        <DropdownMenuTrigger asChild>
          <Button
            className={
              ""
            }
            variant={"default"}
          >
            <LuUser size={22} className="text-muted" />
          </Button>
        </DropdownMenuTrigger>

        {/* Dropdown menu content */}
        <DropdownMenuContent className="w-56 absolute ltr:-end-[70px] rtl:-start-[70px]">
          {/* Menu lable */}
          <DropdownMenuLabel className="rtl:text-end">
          {t("my-account")}
          </DropdownMenuLabel>

          {/* Sperator */}
          <DropdownMenuSeparator />

          {/* Items wrapper */}
          <DropdownMenuGroup>
            {/* Menu items */}
            {dropdownMenuItems.map((item, i) => (
              <>
                {item.title === "Log out" && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  key={i}
                  onClick={item.handleClick}
                  className={"rtl:flex rtl:flex-row-reverse cursor-pointer"}
                >
                  {item.title}
                </DropdownMenuItem>
              </>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
