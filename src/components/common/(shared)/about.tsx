import { Button } from "@/components/ui/button";
import { useTranslations } from "use-intl";

export default function About() {
  // Translation
  const t = useTranslations();

  return (
    <section className=" py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Images */}
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1 row-span-2">
            <img
              src="/assets/images/about/about-1.png"
              alt="Trainer Main"
              className="rounded-xl object-cover w-full h-full"
            />
          </div>

          <div className="col-span-1">
            <img
              src="/assets/images/about/about-2.png"
              alt="Trainer Top Right"
              className="rounded-xl object-cover w-full h-[188px]"
            />
          </div>

          <div className="col-span-1">
            <img
              src="/assets/images/about/about-3.png"
              alt="Trainer Bottom Right"
              className="rounded-xl object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right - Text */}
        <div>
          <h2 className="text-4xl font-bold uppercase">
            {t.rich("empoweringMessage", {
              span: (chunks) => (
                <span className="text-orange-600">{chunks}</span>
              ),
            })}
          </h2>
          <p className=" mt-4">
            {t(
              "we-believe-fitness-is-more-than-just-a-workout-its-a-lifestyle-with-top-of-the-line-facilities-certified-trainers-and-a-supportive-community-were-here-to-inspire-and-guide-you-every-step-of-the-way"
            )}
          </p>

          <div className="grid grid-cols-2 gap-6 mt-8">
            <div>
              <h4 className="font-bold flex items-center gap-x-2 ">
                <img src="/assets/icon/arrow.svg" alt="" />{" "}
                {t("personal-trainer")}
              </h4>
              <p className="text-sm text-gray-600">
                {t(
                  "achieve-your-fitness-goals-with-the-guidance-of-our-certified-trainers"
                )}
              </p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-x-2 ">
                <img src="/assets/icon/arrow.svg" alt="" />{" "}
                {t("cardio-programs")}
              </h4>
              <p className="text-sm text-gray-600">
                {t(
                  "from-steady-state-runs-to-interval-sprints-our-treadmill-programs"
                )}
              </p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-x-2 ">
                <img src="/assets/icon/arrow.svg" alt="" />{" "}
                {t("quality-equipment")}
              </h4>
              <p className="text-sm text-gray-600">
                {t(
                  "our-gym-is-equipped-with-the-latest-cardio-and-strength-machines"
                )}
              </p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-x-2 ">
                <img src="/assets/icon/arrow.svg" alt="" />{" "}
                {t("healthy-nutritions-0")}
              </h4>
              <p className="text-sm text-gray-600">
                {t(
                  "fuel-your-fitness-journey-with-customized-meal-plans-for-you"
                )}
              </p>
            </div>
          </div>

          <Button variant={"default"} className="mt-8">
            {t("get-started-0")}
          </Button>
        </div>
      </div>
    </section>
  );
}
