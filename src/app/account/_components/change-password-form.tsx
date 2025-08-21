"use client";

import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useState, type Dispatch, type SetStateAction } from "react";
import ShowPasswordIcon, {
  type ShowPasswordType,
} from "@/components/custom/show-password-icon";
import { useLocale, useTranslations } from "use-intl";
import { useMutation } from "@tanstack/react-query";
import { changeUserPassword } from "@/lib/apis/account.api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const initialFields = {
  password: false,
  newPassword: false,
  confirmPassword: false,
};

export default function ChangePasswordForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // Translation
  const t = useTranslations();
  const locale = useLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  // States
  const [showPassword, setShowPassword] =
    useState<ShowPasswordType>(initialFields);

  // Mutations
  const mutation = useMutation({
    mutationFn: (payload: changePasswordFields) => changeUserPassword(payload),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setIsOpen(false);
      toast.success(t("password-changed"));
    },
  });

  // Regex patterns
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Form & Validation
  const changePasswordSchema = z
    .object({
      password: z
        .string()
        .min(1, { message: t("current-password-required") })
        .regex(passwordPattern, t("password-pattern")),
      newPassword: z
        .string()
        .min(1, { message: t("new-password-required") })
        .regex(passwordPattern, t("password-pattern")),
      confirmPassword: z
        .string()
        .min(1, { message: t("confirm-password-required") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("Passwords-dont-match"),
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<changePasswordFields>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<changePasswordFields> = (data) => {
    if (data.newPassword === data.password) {
      toast.error(t("new-password-must-be-different"));
      return;
    }

    mutation.mutate(data);
  };

  return (
    <form dir={direction} onSubmit={handleSubmit(onSubmit)} className="w-full p-8">
      {/* Password input */}
      <div className="text-base mb-4 relative">
        <input
          type={!showPassword.password ? "password" : "text"}
          id="password"
          {...register("password")}
          placeholder={t("current-password")}
          className="border rounded-3xl bg-gray-50 p-4 w-full dark:bg-transparent"
        />

        {/* Error fallback message */}
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}

        {/* Password visibilty icon */}
        <ShowPasswordIcon
          field={"password"}
          isShow={showPassword.password}
          setShow={setShowPassword}
        />
      </div>

      {/* New password input */}
      <div className="text-base mb-4 relative">
        <input
          type={!showPassword.newPassword ? "password" : "text"}
          id="newPassword"
          {...register("newPassword")}
          placeholder={t("new-password")}
          className="border rounded-3xl bg-gray-50 p-4 w-full dark:bg-transparent "
        />

        {/* Error fallback message */}
        {errors.newPassword && (
          <p className="text-red-500 mt-1">{errors.newPassword.message}</p>
        )}

        {/* Password visibilty icon */}
        <ShowPasswordIcon
          field={"newPassword"}
          isShow={showPassword.newPassword}
          setShow={setShowPassword}
        />
      </div>

      {/* Confirm password input */}
      <div className="text-base mb-4 relative">
        <input
          type={!showPassword.confirmPassword ? "password" : "text"}
          id="confirmPassword"
          {...register("confirmPassword")}
          placeholder={t("confirm-password")}
          className="border rounded-3xl bg-gray-50 p-4 w-full dark:bg-transparent"
        />

        {/* Error fallback message */}
        {errors.confirmPassword && (
          <p className="text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Password visibilty icon */}
        <ShowPasswordIcon
          field={"confirmPassword"}
          isShow={showPassword.confirmPassword}
          setShow={setShowPassword}
        />
      </div>

      <Button className="w-full mt-4 rounded-3xl">
        {mutation.isPending ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          t("change")
        )}
      </Button>
    </form>
  );
}
