import { Hero } from "@/components/sections/Hero";
import { ServicesCarousel } from "@/components/sections/ServicesCarousel";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Method } from "@/components/sections/Method";
import { BodyMap } from "@/components/sections/BodyMap";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { FAQ } from "@/components/sections/FAQ";
import { CTALocation } from "@/components/sections/CTALocation";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesCarousel />
      <About />
      <Team />
      <Method />
      <BodyMap />
      <Testimonials />
      <BlogTeaser />
      <FAQ />
      <CTALocation />
    </main>
  );
}
