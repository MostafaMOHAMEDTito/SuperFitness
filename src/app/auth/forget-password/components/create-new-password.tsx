import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "use-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "@/hooks/auth/use-forget-password";
import type { OTPProps } from "../page";

// Zod schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateNewPassword({ onNext }: OTPProps) {
  // Translations
  const t = useTranslations();

  // State
  const [showPassword, setShowPassword] = useState(false);

  // Custom hook for resetting password
  const { resetPassword } = useResetPassword();

  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    resetPassword(
      { email: data.email, newPassword: data.password },
      {
        onSuccess: () => {
          console.log("Password reset successful");
          onNext();
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4 py-10 space-y-8">
      <div className="">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-baloo">
          {t("Create-New-Password")}!
        </h2>
      </div>
      <div className="w-full max-w-md backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#D3D3D3] shadow-2xl shadow-black/30">
        <p className="text-xl font-bold text-center mb-6">
          {t("Make-sure-to-create-a-strong-password")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <Input
              icon={<Mail />}
              type="email"
              placeholder={t("email")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <Eye
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full transition-colors duration-300"
          >
            {t("Change-password")}
          </Button>
        </form>
      </div>
    </div>
  );
}
