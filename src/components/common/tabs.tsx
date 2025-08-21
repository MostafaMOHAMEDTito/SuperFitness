"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils/utils";

// Defines the structure of each tab
type TabData = {
    value: string;
    label: string;
    content: React.ReactNode;
};

type TabsComponentProps = {
    tabs: TabData[];
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    tabsListClassName?: string;
    visibleTabsCount?: number;
};

export function TabsComponent({
    tabs,
    defaultValue,
    value,
    onValueChange,
    tabsListClassName,
    visibleTabsCount = 1,
}: TabsComponentProps) {
    // Calculates tab width based on visible count and spacing
    const basisClass = `basis-[calc((100%-${(visibleTabsCount - 1) * 8}px)/${visibleTabsCount})]`;

    return (
        <Tabs
            defaultValue={defaultValue ?? tabs[0]?.value}
            value={value}
            onValueChange={onValueChange}
        >
            {/* Scrollable tab list using carousel */}
            <TabsList
                className={cn(
                    "w-full flex justify-center overflow-visible px-0",
                    tabsListClassName
                )}
            >
                <Carousel opts={{ align: "center" }} className="overflow-visible w-3/4">
                    <CarouselContent >
                        {tabs.map((tab) => (
                            <CarouselItem key={tab.value} className={basisClass}>
                                <TabsTrigger
                                    value={tab.value}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </TabsList>

            {/* Tab content rendering */}
            {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    );
}
