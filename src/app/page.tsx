import { MotionProvider } from "@/components/MotionProvider";
import { Nav } from "@/components/Nav";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/Hero";
import { About } from "@/components/sections/About";
import { Labs } from "@/components/sections/Labs";
import { Builds } from "@/components/sections/Builds";
import { Skills } from "@/components/sections/Skills";
import { Log } from "@/components/sections/Log";
import { Net, Footer } from "@/components/sections/Net";

export default function Home() {
  return (
    <MotionProvider>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Labs />
        <Builds />
        <Skills />
        <Log />
        <Net />
      </main>
      <Footer />
    </MotionProvider>
  );
}
