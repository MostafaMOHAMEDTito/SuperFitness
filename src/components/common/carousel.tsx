"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi} from "@/components/ui/carousel";
        
import clsx from "clsx";
import { GoArrowUpRight } from "react-icons/go";

type CarouselItemType = {
    id: string;
    image?: string; 
    video?: string;
    title: string;
    onClick?: () => void; 
};

type CarouselComponentProps = {
    items: CarouselItemType[];
    rows?: 1 | 2; 
};

export function CarouselComponent({ items, rows = 1 }: CarouselComponentProps) {
    const [api, setApi] = React.useState<CarouselApi | null>(null);
    const [currentGroup, setCurrentGroup] = React.useState(0);

    // Determine number of items per group depending on number of rows
    const itemsPerGroup = rows === 2 ? 6 : 3;
    const groups = Math.ceil(items.length / itemsPerGroup);

    // Split items into chunks (groups)
    const chunkedItems = Array.from({ length: groups }, (_, i) =>
        items.slice(i * itemsPerGroup, (i + 1) * itemsPerGroup)
    );

    // Listen to carousel group change
    React.useEffect(() => {
        if (!api) return;
        const onSelect = () => setCurrentGroup(api.selectedScrollSnap());
        api.on("select", onSelect);
        onSelect();
    }, [api]);

    // Navigate to a specific group manually
    const goToGroup = (groupIndex: number) => api?.scrollTo(groupIndex);

    return (
        <div className="w-full max-w-6xl overflow-x-hidden mx-auto">
            <Carousel opts={{ align: "start", loop: true }} setApi={setApi} className="w-full">
                <CarouselContent className="-ml-1 flex-nowrap">
                    {chunkedItems.map((groupItems, groupIdx) => (
                        <CarouselItem
                            key={groupIdx}
                            className="px-3 basis-full md:basis-full flex-shrink-0"
                        >
                            <div
                                className={clsx("grid gap-4", {
                                    "grid-cols-1 md:grid-cols-3": rows === 1,
                                    "grid-rows-2 md:grid-cols-3": rows === 2,
                                })}
                            >
                                {groupItems.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="relative overflow-hidden rounded-2xl h-[399px] shadow cursor-pointer"
                                        onClick={item.onClick}
                                    >
                                        {item.video ? (
                                            <iframe
                                                src={`https://www.youtube.com/embed/${item.video.split("youtu.be/")[1]
                                                    }`}
                                                title={item.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                alt={item.title}
                                                src={item.image}
                                                className="absolute inset-0 w-full h-full object-cover object-center"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        )}


                                        <div className="absolute bottom-0 left-0 right-0 bg-white/50 dark:bg-zinc-900/50 p-4 backdrop-blur-2xl">
                                            <h3 className="text-zinc-900 dark:text-gray-100 text-xl font-bold mb-2 uppercase tracking-widest line-clamp-1">
                                                {item.title}
                                            </h3>

                                            {/* Explore button */}
                                            <button
                                                className="flex items-center justify-start text-orange-600 hover:text-orange-700 text-xl font-medium pt-2 gap-2 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    item.onClick?.();
                                                }}
                                            >
                                                Explore <GoArrowUpRight className="bg-main rounded-full  text-white dark:text-black p-1"/>
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: groups }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => goToGroup(idx)}
                        className={clsx(
                            "h-2 w-2 rounded-full transition-all",
                            currentGroup === idx
                                ? "bg-orange-600 px-3"
                                : "bg-zinc-900 dark:bg-gray-100"
                        )}
                    />
                ))}
            </div>
        </div>
    );
}
