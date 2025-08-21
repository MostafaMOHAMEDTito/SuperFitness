import AnimatedLine from "@/components/common/animated-line";
import { Button } from "@/components/ui/button";
import { useFormatter, useLocale, useTranslations } from "use-intl";

export default function Hero() {
  // Translation
  const t = useTranslations();
  const format = useFormatter();
  const locale = useLocale();
  
  return (
    <>
      <section
        dir={locale === "ar" ? "rtl" : "ltr"}
        className="relative w-full overflow-hidden min-h-screen flex items-center justify-center"
      >
        {/* Background outside container */}
        <div className="absolute inset-0 z-5 bg-[url('/assets/images/hero/background-image.png')] bg-cover bg-left bg-no-repeat " />

        <div className="absolute inset-0 z-10 bg-white/60 dark:bg-black/80 backdrop-blur-[30.1px]" />

        {/* Container with content */}
        <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 pt-12 lg:pt-24">
          {/* Texts */}
          <div className="w-full z-10 lg:w-1/2 space-y-6 text-center lg:text-start">
            {locale === "ar" ? (
              <h2 className="text-4xl sm:text-5xl font-bold uppercase">
                يمكن لجسدك ان <span className="text-main">يقاوم</span> كل شئ
              </h2>
            ) : (
              <h2 className="text-4xl sm:text-5xl font-bold uppercase">
                Your body can
                <span className="text-main">stand almost</span> anything
              </h2>
            )}

            <p className="relative ps-4 before:content-[''] before:absolute before:start-0 before:top-0 before:w-1 before:h-full before:bg-[#FF3C00] lg:text-start text-zinc-700 dark:text-main-foreground max-w-xl mx-auto lg:mx-0 text-start">
              {t("hero-description")}
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 text-zinc-700 dark:text-main-foreground font-semibold justify-center">
              <div>
                <span className="text-2xl block font-bold text-primary text-start">
                  +
                  {format.number(1200, {
                    style: "decimal",
                    useGrouping: true,
                    numberingSystem: locale === "ar" ? "arab" : "latn",
                  })}
                </span>
                <p className="text-sm py-1 text-start">{t("active-members")}</p>
              </div>
              <div>
                <span className="text-2xl block font-bold text-primary text-start">
                  +
                  {format.number(12, {
                    style: "decimal",
                    useGrouping: true,
                    numberingSystem: locale === "ar" ? "arab" : "latn",
                  })}
                </span>
                <p className="text-sm py-1 text-start">
                  {t("certified-trainers")}
                </p>
              </div>
              <div>
                <span className="text-2xl block font-bold text-primary text-start">
                  +
                  {format.number(20, {
                    style: "decimal",
                    useGrouping: true,
                    numberingSystem: locale === "ar" ? "arab" : "latn",
                  })}
                </span>
                <p className="text-sm py-1 text-start">
                  {t("years-of-experience")}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start pb-4 ">
              <Button variant="default">{t("get-started")}</Button>
              <Button variant="outline">{t("explore-more")}</Button>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/assets/images/hero/hero.png"
              alt="Fitness Hero"
              className="max-w-[300px] sm:max-w-[400px] lg:max-w-full h-auto rounded-lg z-10"
            />
          </div>
        </div>
      </section>

      <AnimatedLine />
    </>
  );
}
