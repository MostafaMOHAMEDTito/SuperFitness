import { useTranslations } from "use-intl";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgetPassword } from "@/hooks/auth/use-forget-password";
import type { OTPProps } from "../page";
import { Link } from "react-router-dom";

// Zod schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof formSchema>;

export default function SendOTP({ onNext }: OTPProps) {
  // Translations
  const t = useTranslations();

  // Custom hook for forget password
  const { forgetPassword } = useForgetPassword();

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
    console.log("Submitted email:", data.email);
    forgetPassword(data, {
      onSuccess: () => {
        console.log("Email submitted successfully");
        onNext();
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white px-4 py-10 space-y-8">
      <div className="">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-baloo">
          {t("Forget-password")}!
        </h2>
      </div>
      <div className="w-full max-w-md backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#D3D3D3] shadow-2xl shadow-black/30">
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
          {t("Email-OTP-page")}
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div className="mb-4">
            <Input
              icon={<Mail />}
              type="text"
              placeholder={t("email")}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full transition-colors duration-300"
          >
            {t("sent-otp-btn")}
          </Button>

          {/* Login link */}
          <div className="text-center text-sm mt-8 text-white">
            <Link
              to={"/en/auth/login"}
              className="font-semibold text-orange-500 hover:underline"
            >
              {t("login-now")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
