"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/utils";
import { BiSolidUpArrow } from "react-icons/bi";

export default function SlideScale() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto max-w-xs">
      <h2 className="text-[#FF3C00] text-base font-semibold text-center uppercase">
        {" "}
        years old{" "}
      </h2>
      <Carousel
        setApi={setApi}
        className="w-full max-w-xs"
        opts={{ loop: true }}
      >
        <CarouselContent className="py-3">
          {Array.from({ length: 10 }).map((_, index) => {
            const diff = Math.abs(index - (current - 1));

            // نحسب الـ scale بناءً على البعد
            let scale = 1 - diff * 0.2; // مثال: current = 1 => 1, الجيران = 0.8، 0.6، الخ
            if (scale < 0.6) scale = 0.6; // لا تسمح بأن تقل عن 0.6

            return (
              <CarouselItem key={index} className="basis-1/6">
                <Card
                  className={cn(
                    "transition-transform duration-500 border-none shadow-none cursor-move ",
                    `scale-[${scale}]`
                  )}
                >
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                    <span
                      className={cn(
                        "transition-colors duration-300",
                        index === current - 1
                          ? "text-[#FF3C00] text-5xl font-semibold"
                          : "text-[#D3D3D3] text-4xl font-bold"
                      )}
                    >
                      {index + 1}
                    </span>
                    {index === current - 1 && (
                      <BiSolidUpArrow
                        className="mt-3 text-[#FF3C00] text-2xl  "
                        width={24}
                        height={24}
                      />
                    )}
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
