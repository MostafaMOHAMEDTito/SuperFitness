import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChangePasswordForm from "./change-password-form";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useTranslations } from "use-intl";
import { useState } from "react";

export default function ChangePasswordDialog({
  children,
}: {
  children: React.ReactNode;
}) {
    // Translation
    const t = useTranslations();

    // States
    const [open, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {children || "Open"}
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-xl text-zinc-800 dark:text-white font-baloo font-semibold text-center">{t("change-your-password")}</DialogTitle>
        <ChangePasswordForm setIsOpen={setIsOpen}/>
      </DialogContent>
    </Dialog>
  );
}
