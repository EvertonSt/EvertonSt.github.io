import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/context";
import { profile } from "../../data/site";
import type { TranslationKey } from "../../i18n/en";
import "./About.css";

const PARAGRAPHS: TranslationKey[] = ["about.p1", "about.p2", "about.p3", "about.p4"];

export function About() {
  const { t } = useLanguage();

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="section-inner">
        <SectionHeading id="about-title" title={t("about.title")} />

        <div className="about__body">
          {PARAGRAPHS.map((key) => (
            <p key={key}>{t(key)}</p>
          ))}
        </div>

        <ul className="about__facts">
          {profile.targetRoles.map((role) => (
            <li className="about__fact" key={role}>
              {role}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
