import { Analytics } from "@vercel/analytics/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { HowIBuild } from "./components/HowIBuild";
import { Qa } from "./components/Qa";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <HowIBuild />
        <Qa />
        <About />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
