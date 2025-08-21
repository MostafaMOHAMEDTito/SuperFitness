import { lazy, Suspense, useState } from "react";
import { useTranslations } from "use-intl";

// Types
export interface OTPProps {
  onNext: () => void;
}

// Lazy load components
const SendOTP = lazy(() => import("./components/send-opt"));
const OTPCode = lazy(() => import("./components/otp-code"));
const CreateNewPassword = lazy(
  () => import("./components/create-new-password")
);

export default function ForgetPasswordPage() {
  // Translations
  const t = useTranslations();
  
  // State 
  const [step, setStep] = useState(1);

  // Function to go to the next step
  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <div className="w-full text-3xl flex items-center justify-center flex-col">
      <Suspense fallback={<div className="text-white">{t("loading")}</div>}>
        {step === 1 && <SendOTP onNext={nextStep} />}
        {step === 2 && <OTPCode onNext={nextStep} />}
        {step === 3 && <CreateNewPassword onNext={nextStep} />}
      </Suspense>
    </div>
  );
}
