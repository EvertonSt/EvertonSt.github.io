import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/context";
import { focusAreas } from "../../data/skills";
import "./Focus.css";

/**
 * What the owner is hired for.
 *
 * This section answers the question a hiring manager actually has - "what would
 * I use this person for on day one?" - rather than restating the job titles that
 * are already in the hero. Icons are inline SVG rather than emoji: emoji render
 * differently per operating system, inherit colour unreliably, and are read out
 * by screen readers as their Unicode names.
 */
export function Focus() {
  const { t } = useLanguage();

  return (
    <section className="section" id="focus" aria-labelledby="focus-title">
      <div className="section-inner">
        <SectionHeading id="focus-title" title={t("focus.title")} subtitle={t("focus.subtitle")} />

        <ul className="focus__grid">
          {focusAreas.map((area) => (
            <li className="focus__card" key={area.id}>
              <span className="focus__icon">
                <Icon name={area.icon} size={22} />
              </span>
              <h3 className="focus__card-title">{t(area.titleKey)}</h3>
              <p className="focus__card-body">{t(area.descriptionKey)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
