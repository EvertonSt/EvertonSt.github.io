import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/context";
import { experience } from "../../data/experience";
import "./Experience.css";

export function Experience() {
  const { t } = useLanguage();

  return (
    <section className="section" id="experience" aria-labelledby="experience-title">
      <div className="section-inner">
        <SectionHeading
          id="experience-title"
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        <ol className="experience__list">
          {experience.map((entry) => (
            <li key={entry.id}>
              <Card className="experience__card" interactive={false}>
                <div className="experience__header">
                  <div className="experience__identity">
                    <h3 className="experience__role">{t(entry.titleKey)}</h3>
                    <p className="experience__company">{t(entry.companyKey)}</p>
                  </div>
                  <div className="experience__meta">
                    <span className="experience__period">{entry.period}</span>
                    <span className="experience__place">
                      {entry.location} · {t(entry.arrangementKey)}
                    </span>
                  </div>
                </div>

                <ul className="experience__achievements">
                  {entry.achievementKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>

                {entry.links ? (
                  <ul className="experience__links">
                    {entry.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
