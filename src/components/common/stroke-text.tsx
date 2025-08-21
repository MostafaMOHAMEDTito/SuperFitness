import { useTranslations } from "use-intl";

type GradientStrokeTextProps = {
    width?: number;
    height?: number;
    viewBox?: string;
    className?: string;
    textKey?: string;   //  i18n key
    text?: string;      // direct text override
};

export default function GradientStrokeText({
    width = 332,
    height = 77,
    viewBox = "0 0 261 77",
    className = "text-center mx-auto w-[180px] h-auto md:w-[261px]",
    textKey = "healthy",
    text,
}: GradientStrokeTextProps) {

    // Translations
    const t = useTranslations();

    return (
        <svg
            viewBox={viewBox}
            style={{ width, height }}
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <linearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#232425" />
                </linearGradient>
            </defs>

            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="48"
                fontWeight="700"
                fill="transparent"
                stroke="url(#gradientStroke)"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeLinecap="round"
                className="uppercase"
                style={{
                    fontFamily: "Nunito, sans-serif",
                    textRendering: "geometricPrecision",
                }}
            >
                {text || t(textKey)}
            </text>
        </svg>
    );
}
