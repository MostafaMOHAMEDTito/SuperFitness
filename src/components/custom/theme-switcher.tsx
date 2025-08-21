import { Switch } from "../ui/switch";
import { useTheme } from "@/context/them-context";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
      className="data-[state=checked]:bg-main data-[state=unchecked]:bg-zinc-800 dark:data-[state=checked]:bg-main dark:data-[state=unchecked]:bg-zinc-800"
    />
  );
};

export default ThemeSwitcher;
