import Hero from "@/components/Hero"
import LatestNews from "@/components/LatestNews"
import Testimonials from "@/components/Testimonials"
import FeaturesSection from "@/components/FeaturesSection"
import StatsSection from "@/components/StatsSection"

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturesSection />
      <StatsSection />
      <LatestNews />
      <Testimonials />
    </div>
  )
}
