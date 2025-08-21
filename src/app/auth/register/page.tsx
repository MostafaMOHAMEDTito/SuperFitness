import { useState, lazy, Suspense } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useRegister from "@/hooks/auth/use-register";
import { useTranslations } from "use-intl";

export interface NextProps {
  next: () => void;
  prev?: () => void;
  isPending: boolean;
}

// Lazy-loaded components
const InformationSection = lazy(() => import("./section/information-section"));
const GenderSection = lazy(() => import("./section/gender-section"));
const AgeSection = lazy(() => import("./section/age-section"));
const WeightSection = lazy(() => import("./section/weight-section"));
const HeightSection = lazy(() => import("./section/height-section"));
const GoalSection = lazy(() => import("./section/goal-section"));
const ActivityLevelSection = lazy(
  () => import("./section/activity-level-section")
);

// Zod schema
const goalEnum = z.enum([
  "gain weight",
  "lose weight",
  "get fitter",
  "gain flexible",
  "learn basic",
]);

const schema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    rePassword: z.string().min(6),
    gender: z.enum(["male", "female"]),
    age: z.number().min(15),
    weight: z.number().min(1),
    height: z.number().min(1),
    goal: goalEnum.refine((value) => value !== undefined),
    activityLevel: z.string().min(1),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
  });

export type FormSchema = z.infer<typeof schema>;

const steps = [
  InformationSection,
  GenderSection,
  AgeSection,
  WeightSection,
  HeightSection,
  GoalSection,
  ActivityLevelSection,
];

export default function RegisterPage() {
  // Translations
  const t = useTranslations();

  const methods = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "male",
      age: 25,
      weight: 70,
      height: 170,
      goal: "gain weight",
      activityLevel: "level1",
    },
  });

  const [step, setStep] = useState(0);
  const { registerUser, isPending } = useRegister();

  const next = async () => {
    const isValid = await methods.trigger();
    if (!isValid) return;

    if (step === steps.length - 1) {
      const values = methods.getValues();
      console.log("Final Form Values:", values);
      registerUser(values);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const prev = () => setStep((prev) => Math.max(prev - 1, 0));
  const CurrentStep = steps[step];

  return (
    <FormProvider {...methods}>
      <Suspense fallback={<div className="text-white">{t("loading")}</div>}>
        <CurrentStep next={next} prev={prev} isPending={isPending} />
      </Suspense>
    </FormProvider>
  );
}
