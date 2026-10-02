import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { ProofStrip } from "./components/sections/ProofStrip";
import { Work } from "./components/sections/Work";
import { Focus } from "./components/sections/Focus";
import { SupportingProjects } from "./components/sections/SupportingProjects";
import { Experience } from "./components/sections/Experience";
import { Resume } from "./components/sections/Resume";
import { TechStack } from "./components/sections/TechStack";
import { About } from "./components/sections/About";
import { Contact } from "./components/sections/Contact";
import { useLanguage } from "./i18n/context";

/**
 * Section order is a decision, not an accident.
 *
 * A recruiter reads top to bottom and gives the page seconds: what role, what
 * proof, what was built, what they would hire for, where they worked, the
 * résumé to forward on, the tools, the reasoning, how to reply. The résumé sits
 * before the stack because it is the artefact they forward to a colleague.
 *
 * `id="main-content"` is the skip link's target, so it must exist before
 * anything else renders.
 */
export default function App() {
  const { t } = useLanguage();

  return (
    <>
      <a className="skip-to-content" href="#main-content">
        {t("doc.skipToContent")}
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <ProofStrip />
        <Work />
        <Focus />
        <SupportingProjects />
        <Experience />
        <Resume />
        <TechStack />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
