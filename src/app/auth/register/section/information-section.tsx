import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslations } from "use-intl";
import { useFormContext } from "react-hook-form";
import SocialIcon from "../../components/social-icon";
import type { FormSchema, NextProps } from "../page";

export default function InformationSection({ next, isPending }: NextProps) {
  // Translations
  const t = useTranslations();

  // State
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormSchema>();

  // Handle form submission
  const onSubmit = () => {
    next();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-h-screen text-white">
      <div className="w-full max-w-lg mx-auto max-h-screen scrollbar-none overflow-y-auto flex flex-col items-center space-y-2 px-6 py-2 font-sans">
        <div className="text-center mb-2">
          {/* Title */}
          <p className="text-zinc-800 dark:text-main-foreground text-2xl font-baloo mb-2">
            {t("hey-there")},
          </p>
          <h1 className="text-xl md:text-2xl lg:text-4xl text-zinc-800 dark:text-main-foreground font-extrabold tracking-wider font-baloo">
            {t("create-an-account")}!
          </h1>
        </div>

        <div className="w-full">
          <div className=" rounded-3xl px-10 py-8 border border-zinc-800 dark:border-[#D3D3D3]">
            <div className="">
              {/* Title */}
              <h2 className="text-2xl text-zinc-800 dark:text-main-foreground font-bold text-center mb-6">
                {t("Register-page")}
              </h2>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* First name input */}
                <div className="mb-4">
                  <Input
                    icon={<User />}
                    type="text"
                    placeholder={t("frist-name")}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last name input */}
                <div className="mb-4">
                  <Input
                    icon={<User />}
                    type="text"
                    placeholder={t("last-name")}
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email input */}
                <div className="mb-4">
                  <Input
                    icon={<Mail />}
                    type="text"
                    placeholder={t("email")}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password input */}
                <div className="mb-4 relative">
                  <Eye
                    className="absolute right-4 top-2.5 text-zinc-800 dark:text-main-foreground  cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <Input
                    icon={<Lock />}
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password")}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Re-Password input */}
                <div className="mb-2 relative">
                  <Eye
                    className="absolute right-4 top-2.5 text-zinc-800 dark:text-main-foreground  cursor-pointer"
                    onClick={() => setShowRePassword(!showRePassword)}
                  />
                  <Input
                    icon={<Lock />}
                    type={showRePassword ? "text" : "password"}
                    placeholder={t("password")}
                    {...register("rePassword")}
                  />
                  {errors.rePassword && (
                    <p className="text-red-500 text-sm">
                      {errors.rePassword.message}
                    </p>
                  )}
                </div>

                {/* Link forget password */}
                <Link
                  to={"/en/auth/forget-password"}
                  className="block w-fit ms-auto text-sm text-main hover:underline mb-3 font-baloo font-bold"
                >
                  {t("forget-password")}
                </Link>

                {/* Social icons */}
                <SocialIcon />

                {/* Register button */}
                <Button
                  disabled={isPending}
                  className="w-full bg-main hover:bg-main-hover text-white font-bold py-3 rounded-full transition-colors duration-300"
                >
                  {t("register-btn")}
                </Button>

                <div className="text-center text-sm mt-2 text-zinc-800 dark:text-main-foreground font-medium font-baloo">
                  {t("Already-Have-an-account")}{" "}
                  <Link
                    to={"/en/auth/login"}
                    className="font-semibold text-main hover:underline"
                  >
                    {t("login-register")}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
