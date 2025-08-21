import { Skeleton } from "@/components/ui/skeleton"; 
// Import your Skeleton component (or replace with a styled <div> if you don't have one)

const TabsSkeleton = () => {
  return (
    <div className="flex justify-center flex-wrap gap-2 px-2 sm:px-0 bg-transparent">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="px-4 py-1 text-sm md:text-xl border border-main rounded-full"
        >
          {/* Skeleton placeholder for the tab text */}
          <Skeleton className="h-5 w-20 md:w-28 bg-gray-300 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default TabsSkeleton;
