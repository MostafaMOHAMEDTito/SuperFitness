import { useTranslations } from "use-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useVerifyResetCode } from "@/hooks/auth/use-forget-password";
import type { OTPProps } from "../page";
import { Clock } from "lucide-react";

// Zod schema
const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type FormData = z.infer<typeof formSchema>;

export default function OTPCode({ onNext }: OTPProps) {
  // Translations
  const t = useTranslations();

  // Custom hook for verifying reset code
  const { verifyResetCode } = useVerifyResetCode();

  // Form handling
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  // Watch the OTP value
  const otpValue = watch("otp");

  // Handle form submission
  const onSubmit = (data: FormData) => {
    console.log("Submitted OTP:", data.otp);
    verifyResetCode(
      { resetCode: data.otp },
      {
        onSuccess: () => {
          console.log("OTP verified successfully");
          onNext();
        },
      }
    );
  };

  // Timer for OTP expiration
  const [secondsLeft, setSecondsLeft] = useState(600);
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full text-white px-4 py-10 space-y-6">
      <div className="">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-wide font-baloo">
          {t("OTP-code-page")}
        </h2>
      </div>
      <div className="w-full max-w-md backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-[#D3D3D3] shadow-2xl shadow-black/30  space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-center mb-6">
          {t("Enter-The-OTP-You-Have-Received")}
        </h3>

        {/* OTP Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input OTP */}
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(value) => setValue("otp", value)}
            containerClassName="justify-center"
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>

          {errors.otp && (
            <p className="text-red-500 text-center text-sm mt-2">
              {errors.otp.message}
            </p>
          )}

          {/* Timer */}
          <div className="text-center text-sm text-gray-300 mt-3 flex items-center justify-center">
            <Clock className="mr-2" /> {t("Code-expires-in")}:{" "}
            {formatTime(secondsLeft)}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-full transition-colors duration-300 mt-4"
            disabled={secondsLeft <= 0}
          >
            {t("Confirm-btn")}
          </Button>

          {/* Resend Code Link */}
          <div className="text-center text-sm text-white mt-4">
            {t("Did-Receive-Verification-Code")}{" "}
            <Link
              to="/en/auth/forget-password"
              className="text-orange-500 underline hover:text-orange-600"
            >
              {t("Resend-Code")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
