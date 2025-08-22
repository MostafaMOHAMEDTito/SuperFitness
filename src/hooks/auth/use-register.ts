import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { register } from "@/lib/apis/auth.api";
import { useLocale, useTranslations } from "use-intl";

export default function useRegister() {
  // Translations
  const t = useTranslations();
  const locale = useLocale();

  const {
    isPending,
    error,
    mutate: registerUser,
  } = useMutation({
    mutationFn: async (signupData: SignupData) => {
      const response = await register(signupData);

      if (!response?.token) {
        throw new Error(t("register-failed"));
      }

      return response;
    },
    onSuccess: () => {
      toast.success(t("account-created"));
      setTimeout(() => {
        window.location.href = `/${locale}/auth/login`;
      }, 1000);
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Something went wrong");
      setTimeout(() => {
        window.location.href = `/SuperFitness/${locale}/auth/register`;
      }, 1500);
    },
  });

  return { isPending, error, registerUser };
}
