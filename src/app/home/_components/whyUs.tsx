import { motion } from "framer-motion";
import { CiDumbbell } from "react-icons/ci";
import { useFormatter, useLocale, useTranslations } from "use-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function WhyUs() {
  // translations
  const t = useTranslations();
  const locale = useLocale();
  const format = useFormatter();

  // Check if the locale is Arabic
  const isArabic = locale === "ar";

  const features = [
    {
      id: format.number(1, {
        style: "decimal",
        numberingSystem: isArabic ? "arab" : "latn",
        useGrouping: false,
        minimumIntegerDigits: 2,
      }),
      title: t("personalized-fitness"),
      description: t("we-tailor"),
    },
    {
      id: format.number(2, {
        style: "decimal",
        numberingSystem: isArabic ? "arab" : "latn",
        useGrouping: false,
        minimumIntegerDigits: 2,
      }),
      title: t("results-driven-focus"),
      description: t("everything-do"),
    },
    {
      id: format.number(3, {
        style: "decimal",
        numberingSystem: isArabic ? "arab" : "latn",
        useGrouping: false,
        minimumIntegerDigits: 2,
      }),
      title: t("state-equipment"),
      description: t("we-provide-the-latest-"),
    },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="bg-muted py-10 px-4 sm:px-8 lg:px-20 text-zinc-800 dark:text-zinc-100 transition-colors duration-300"
    >
      <div className="mx-auto flex flex-col lg:flex-row gap-12">
        {/* Content */}
        <motion.div
          className="lg:w-1/2 space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0}
        >
          {/* Tagline */}
          <div className="z-10 inline-block relative font-baloo">
            <h1 className="-z-10 relative opacity-50  text-opacity-50 dark:from-zinc-700 dark:via-zinc-800 dark:to-black  uppercase inline-block text-6xl text-muted font-bold tracking-wide [text-shadow:1px_1px_0_#f3f3f4,4px_4px_0_#9999] ">
              {t("why-us")}
              <div className="bg-muted  opacity-20 rounded-2xl w-full h-full absolute top-0 left-0"></div>
            </h1>
            <div className="flex items-center gap-2 absolute -bottom-1 left-0">
              <CiDumbbell className="text-main" />
              <p className="text-main text-xs">{t("why-us")}</p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="uppercase text-4xl font-bold font-baloo text-zinc-900 dark:text-zinc-100">
            {t("elevate-fitness")} <br />
            <span className="text-main">{t("best-way")}</span> {t("possible")}
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 font-rubik mb-8 pb-6">
            {t("we-offer-a-fitness-journey")}
          </p>

          {/* Features */}
          <div className="space-y-16 relative">
            {features.map((item, index) => (
              <motion.div
                key={item.id}
                className={`flex items-start gap-4 group relative ${
                  isArabic ? "flex-row-reverse" : "flex-row"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index + 1}
              >
                <div className="w-16 h-16 bg-main text-sm text-white font-bold rounded-full flex items-center justify-center relative group-hover:scale-110 transition-transform duration-300">
                  {item.id}
                  <div className="w-[1px] h-5 bg-gray-300 dark:bg-zinc-700 absolute top-16 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <div
                  className={`text-start ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  <h3 className="text-base font-bold group-hover:text-main transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base font-normal text-zinc-700 dark:text-zinc-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Images */}
        <motion.div
          className="lg:w-1/2 flex flex-col sm:flex-row gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={features.length + 1}
        >
          <div className="w-full sm:w-1/2 flex flex-col gap-3">
            <motion.img
              src={`${
                import.meta.env.BASE_URL
              }/assets/whyus/a084847171b82e0d3555197c79e4a4fe411372a0.png`}
              alt="Personal trainer assisting client 1"
              className="rounded-lg object-cover h-44 sm:h-[378px] w-full"
              whileHover={{
                scale: 1.1,
                rotate: 1,
                transition: { duration: 0.3 },
              }}
              loading="lazy"
            />
            <motion.img
              src={`${
                import.meta.env.BASE_URL
              }/assets/whyus/0b929cce1233f01c708099e24e0cfde887311fba.jpg`}
              alt="Personal trainer assisting client 3"
              className="rounded-lg object-cover h-44 sm:h-80 w-full"
              whileHover={{
                scale: 1.07,
                rotate: 1,
                transition: { duration: 0.3 },
              }}
              loading="lazy"
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-3 justify-center pt-8">
            <motion.img
              src={`${
                import.meta.env.BASE_URL
              }/assets/whyus/915a60319b233e8b179edea6ec6411a41a392d9a.jpg`}
              alt="Personal trainer assisting client 2"
              className="rounded-lg object-cover h-44 sm:h-72 w-full"
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3 },
              }}
              loading="lazy"
            />
            <motion.img
              src={`${
                import.meta.env.BASE_URL
              }/assets/whyus/80ded4712cd34108c0b7efc51d18667ba5243e06.png`}
              alt="Personal trainer assisting client 4"
              className="rounded-lg object-cover h-44 sm:h-80 w-full"
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.3 },
              }}
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
