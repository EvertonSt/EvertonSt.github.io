import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { StatusBadge } from "../ui/StatusBadge";
import { useLanguage } from "../../i18n/context";
import { supportingProjects } from "../../data/projects";
import "./SupportingProjects.css";

export function SupportingProjects() {
  const { t } = useLanguage();

  return (
    <section className="section" id="supporting" aria-labelledby="supporting-title">
      <div className="section-inner">
        <SectionHeading id="supporting-title" title={t("projects.title")} subtitle={t("projects.subtitle")} />

        <ul className="supporting__grid">
          {supportingProjects.map((project) => (
            <li key={project.id}>
              <Card className="supporting__card">
                <div className="supporting__header">
                  <h3 className="supporting__title">{t(project.titleKey)}</h3>
                  <StatusBadge status={project.status} />
                </div>
                <p className="supporting__body">{t(project.descriptionKey)}</p>
                <a className="supporting__link" href={project.url} target="_blank" rel="noopener noreferrer">
                  <Icon name="github" size={15} />
                  {t("work.visitRepo")}
                </a>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
