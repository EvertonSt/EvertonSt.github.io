import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { ProofStrip } from './components/sections/ProofStrip';
import { FlagshipProject } from './components/sections/FlagshipProject';
import { EngineeringFocus } from './components/sections/EngineeringFocus';
import { AdditionalProjects } from './components/sections/AdditionalProjects';
import { Experience } from './components/sections/Experience';
import { TechnicalStack } from './components/sections/TechnicalStack';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { SectionHeading } from './components/ui/SectionHeading';
import { flagshipProjects } from './data/projects';
import { useLanguage } from './i18n';

export default function App() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProofStrip />
        <section className="section" id="work">
          <div className="section-inner">
            <SectionHeading title={t('work.title')} subtitle={t('work.subtitle')} />
            {flagshipProjects.map((p, i) => (
              <FlagshipProject key={p.id} project={p} reverse={i % 2 === 1} />
            ))}
          </div>
        </section>
        <EngineeringFocus />
        <AdditionalProjects />
        <Experience />
        <TechnicalStack />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
