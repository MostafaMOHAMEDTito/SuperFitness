type ProgressArcProps = {
  value: number;
  max: number;
  size?: number;
};

export default function ProgressArc({
  value,
  max,
  size = 90,
}: ProgressArcProps) {
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = value / max;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        {/* Back track of the circle */}
        <circle
          className="text-transparent"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Arc of Progress */}
        <circle
          className="text-main"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          // strokeLinecap="round"/
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-zinc-800 dark:text-main-foreground  text-base font-semibold">
        {value}/{max}
      </div>
    </div>
  );
}
