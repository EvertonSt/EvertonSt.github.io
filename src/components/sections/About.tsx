import { SectionHeading } from '../ui/SectionHeading';
import './About.css';
export function About() {
  return (<section className="section" id="about"><div className="section-inner">
    <SectionHeading title="About" />
    <div className="about__content">
      <p>I like figuring out why software fails, then building systems that make those failures easier to catch, understand, and prevent.</p>
      <p>I'm a QA/SDET engineer building automated testing systems and AI-powered quality tools. My work combines Playwright, Cypress, TypeScript, GitHub Actions, API testing, CI/CD, and LLM evaluation.</p>
      <p>I've publicly built and deployed Argus, an autonomous AI QA agent; Cerberus CI, an AI-powered CI quality gate; and Enlace, a full-stack ISP management platform.</p>
      <p>I'm based in Brazil (UTC-3), fluent in English, and comfortable collaborating with US, Canadian, and European teams. I'm open to remote opportunities as a QA Automation Engineer, Software Engineer in Test, SDET, or Quality Engineer.</p>
    </div>
  </div></section>);
}
