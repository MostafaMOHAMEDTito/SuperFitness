import { useState } from "react";
import { useTranslations } from "use-intl";
import { Input } from "@/components/ui/input";
import { Eye, Loader2, Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SocialIcon from "../components/social-icon";
import useLogin from "@/hooks/auth/use-login";

// Zod schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="w-full max-h-screen flex flex-col items-center justify-center text-white p-4 bg-gradient-to-br overflow-hidden">
      <div className="w-full max-w-lg mx-auto text-center mb-4 px-4">
        <p className="text-zinc-800 dark:text-main-foreground text-xl md:text-2xl font-baloo mb-2">
          {t("hey-there")},
        </p>
        <h2 className="text-zinc-800 dark:text-main-foreground text-xl md:text-3xl lg:text-4xl font-extrabold tracking-wide font-baloo">
          {t("WELCOME-BACK")}!
        </h2>
      </div>

      <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 border border-zinc-800 dark:border-[#D3D3D3]">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-zinc-800 dark:text-main-foreground font-baloo mb-4">
          {t("login-page")}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div>
            <Input
              icon={<Mail />}
              type="text"
              placeholder={t("email")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password input */}
          <div className="relative">
            <Eye
              className="absolute right-4 top-2.5 text-zinc-800 dark:text-main-foreground cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
            <Input
              icon={<Lock />}
              type={showPassword ? "text" : "password"}
              placeholder={t("password")}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forget password */}
          <Link
            to={"/en/auth/forget-password"}
            className="block w-fit ms-auto text-right text-sm text-main hover:underline mb-4 font-baloo font-semibold"
          >
            {t("forget-password")}
          </Link>

          {/* Social icons */}
          <SocialIcon />

          {/* Login button */}
          <Button
            type="submit"
            className="w-full bg-main hover:bg-main text-white font-bold py-3 rounded-full transition duration-300 flex items-center justify-center gap-2 font-baloo"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 font-baloo" />
                {t("loading")}
              </>
            ) : (
              t("login")
            )}
          </Button>

          {/* Register link */}
          <div className="text-center text-sm mt-6 text-zinc-800 dark:text-main-foreground font-medium font-baloo">
            {t("you-dont-have-an-account")}{" "}
            <Link
              to={"/en/auth/register"}
              className="font-semibold font-baloo text-main hover:underline"
            >
              {t("register-login")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
