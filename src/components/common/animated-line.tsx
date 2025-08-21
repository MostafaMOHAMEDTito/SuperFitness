import { PiStarFourFill } from "react-icons/pi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations, useLocale } from "use-intl";

export default function AnimatedLine() {
  // Translation & locale
  const t = useTranslations();
  const locale = useLocale();
  const isArabic = locale === "ar";

  // Texts
  const allText = [
    t("live-classes"),
    t("outdoor-and-online-trainers"),
    t("personal-training"),
    t("personal-trainers"),
    t("live-classes"),
    t("outdoor-and-online-trainers"),
    t("personal-training"),
    t("personal-trainers"),
  ];

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="h-[70px] sm:h-[86px] bg-main flex items-center overflow-hidden"
    >
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,
            stopOnInteraction: false,
          }),
        ]}
        opts={{
          loop: true,
          direction: isArabic ? "rtl" : "ltr",
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="items-center">
          {allText.map((item, index) => (
            <CarouselItem
              key={`${item}-${index}`}
              className="flex items-center justify-center text-white font-semibold whitespace-nowrap basis-auto p-0 min-w-max"
            >
              <PiStarFourFill className="mx-2 sm:mx-3 md:mx-4" size={20} />
              <span className="font-bold leading-9 text-base sm:text-xl md:text-2xl">
                {item}
              </span>
              <PiStarFourFill className="mx-2 sm:mx-3 md:mx-4" size={20} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
