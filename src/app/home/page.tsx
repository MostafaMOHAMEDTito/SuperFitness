import WorkOuts from "./_components/workouts";
import WhyUs from "./_components/whyUs";
import Healthy from "./_components/healthy";
import About from "@/components/common/(shared)/about";
import Hero from "./_components/hero";

export default function HomePage() {
  return (
    <section>
      <Hero />
      <About />
      <WorkOuts />
      <WhyUs />
      <Healthy />
    </section>
  );
}
