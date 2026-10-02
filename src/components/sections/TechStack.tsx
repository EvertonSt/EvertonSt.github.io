import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/context";
import { skillCategories } from "../../data/skills";
import "./TechStack.css";

export function TechStack() {
  const { t } = useLanguage();

  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="section-inner">
        <SectionHeading id="stack-title" title={t("stack.title")} subtitle={t("stack.subtitle")} />

        <div className="stack__grid">
          {skillCategories.map((category) => (
            <section className="stack__category" key={category.id} aria-label={t(category.titleKey)}>
              <h3 className="stack__category-title">{t(category.titleKey)}</h3>
              <ul className="stack__list">
                {category.skills.map((skill) => (
                  <li className="stack__skill" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
