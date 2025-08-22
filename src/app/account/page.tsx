import { getLoggedUserData } from "@/lib/apis/auth.api";
import { useQuery } from "@tanstack/react-query";
import TopItems from "./_components/top-items";
import SittingsItems from "./_components/sittings-items";

export default function AccountPage() {
  // Queries
  const { data, isLoading, error } = useQuery({
    queryKey: ["muscles"],
    queryFn: () => getLoggedUserData(),
  });

  // Error handling
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-center text-2xl font-bold font-baloo">
          Error loading user
        </p>
      </div>
    );

  return (
    <section className="max-h-screen py-10 relative">
      <div className="max-w-3xl mx-auto h-full">
        {/* Top items */}
        <TopItems
          isLoading={isLoading}
          goal={data?.user.goal}
          level={data?.user.activityLevel}
          weight={data?.user.weight}
        />

        {/* Sittings items */}
        <SittingsItems />
      </div>

      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-muted/70 backdrop-blur-sm z-10"></div>
      <img
        src={`${import.meta.env.BASE_URL}/assets/section-bg.png`}
        alt="section-bg"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
    </section>
  );
}
