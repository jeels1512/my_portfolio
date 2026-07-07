import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CrtOverlay } from "@/components/CrtOverlay";
import { BootSequence } from "@/components/BootSequence";
import { CommandPalette } from "@/components/CommandPalette";
import { Hero } from "@/components/hero/Hero";
import { Labs } from "@/components/sections/Labs";
import { Builds } from "@/components/sections/Builds";
import { Skills } from "@/components/sections/Skills";
import { Creds } from "@/components/sections/Creds";
import { Log } from "@/components/sections/Log";
import { Net, Footer } from "@/components/sections/Net";

export default function Home() {
  return (
    <MotionProvider>
      <BootSequence />
      <SmoothScroll />
      <CrtOverlay />
      <Nav />
      <CommandPalette />
      <main>
        <Hero />
        <Labs />
        <Builds />
        <Skills />
        <Creds />
        <Log />
        <Net />
      </main>
      <Footer />
    </MotionProvider>
  );
}
