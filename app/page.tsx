import { Motion } from "@/animations/Motion";
import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { Numbers } from "@/components/sections/Numbers";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Method } from "@/components/sections/Method";
import { Works } from "@/components/sections/Works";
import { City } from "@/components/sections/City";
import { Awards } from "@/components/sections/Awards";
import { Reviews } from "@/components/sections/Reviews";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <Hero />
        <Numbers />
        <About />
        <Timeline />
        <Method />
        <Works />
        <City />
        <Awards />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
      <Cursor />
      <Motion />
    </>
  );
}
