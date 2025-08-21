import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function NavbarThemeSwitcher () {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border rounded bg-transparent hover:bg-transparent text-zinc-800 dark:text-white border-none"
    >
     {theme === "dark" ? <MdOutlineLightMode size={28}/> : <MdOutlineDarkMode size={28}/>}
    </Button>
  );
};