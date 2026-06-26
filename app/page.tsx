import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { CreateBand } from "@/components/sections/create-band";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { WhyChooseMe } from "@/components/sections/why-choose-me";
import { Certifications } from "@/components/sections/certifications";
import { Testimonials } from "@/components/sections/testimonials";
import { ClientLogos } from "@/components/sections/client-logos";
import { TechMarquee } from "@/components/sections/tech-marquee";
import { CtaBand } from "@/components/sections/cta-band";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/lumora/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <CreateBand />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <FeaturedProject />
      <Projects />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <Process />
      <WhyChooseMe />
      <SectionDivider />
      <Certifications />
      <ClientLogos />
      <Testimonials />
      <TechMarquee />
      <SectionDivider />
      <CtaBand />
      <Contact />
    </>
  );
}
