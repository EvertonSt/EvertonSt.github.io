import { SectionHeading } from "../ui/SectionHeading";
import { FlagshipProjectCard } from "./FlagshipProjectCard";
import { useLanguage } from "../../i18n/context";
import { flagshipProjects } from "../../data/projects";
import "./Work.css";

export function Work() {
  const { t } = useLanguage();

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="section-inner">
        <SectionHeading id="work-title" title={t("work.title")} subtitle={t("work.subtitle")} />
        <div className="work__list">
          {flagshipProjects.map((project) => (
            <FlagshipProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
