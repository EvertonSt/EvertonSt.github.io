import { useId, useState } from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Icon } from "../ui/Icon";
import { StatusBadge } from "../ui/StatusBadge";
import { Tag } from "../ui/Tag";
import { useLanguage } from "../../i18n/context";
import { STATUS_DETAIL_KEYS, type Project } from "../../data/projects";
import "./FlagshipProjectCard.css";

interface FlagshipProjectCardProps {
  project: Project;
}

/**
 * One project, with its case study.
 *
 * The case study is a disclosure rather than a link or a permanent block. It
 * keeps the section scannable - a recruiter reading five cards should be able
 * to decide which one to open from the title and the description alone - and it
 * is a real button with `aria-expanded` and `aria-controls`, so its state is
 * announced rather than merely drawn.
 *
 * Status appears twice on purpose: the badge in the header is scannable, and the
 * note below the links states in words what a visitor will find behind them.
 * A colour alone is not information for someone who cannot distinguish amber
 * from grey, or who is reading on a screen in bright sunlight.
 */
export function FlagshipProjectCard({ project }: FlagshipProjectCardProps) {
  const { t, tList } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const caseStudyId = useId();

  return (
    <Card className="fp" interactive={false}>
      <div className="fp__header">
        <div className="fp__identity">
          <h3 className="fp__title">{t(project.titleKey)}</h3>
          <p className="fp__subtitle">{t(project.subtitleKey)}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className="fp__description">{t(project.descriptionKey)}</p>

      {project.metrics.length > 0 ? (
        <dl className="fp__metrics">
          {project.metrics.map((metric) => (
            <div className="fp__metric" key={`${metric.value}-${metric.labelKey}`}>
              <dt className="visually-hidden">{t(metric.labelKey)}</dt>
              <dd>
                <span className="fp__metric-value">{metric.value}</span>
                <span className="fp__metric-label">{t(metric.labelKey)}</span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <ul className="fp__tags" aria-label={t("stack.title")}>
        {tList(project.tagsKey).map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>

      <div className="fp__links">
        {project.links.map((link) => (
          <Button key={link.url} variant="secondary" size="sm" href={link.url} external>
            <Icon name={link.icon} size={15} />
            {t(link.labelKey)}
          </Button>
        ))}
      </div>

      <p className="fp__status-note">
        <Icon name="clock" size={14} />
        <span>{t(STATUS_DETAIL_KEYS[project.status])}</span>
      </p>

      <button
        type="button"
        className="fp__toggle"
        aria-expanded={expanded}
        aria-controls={caseStudyId}
        onClick={() => setExpanded((open) => !open)}
      >
        {expanded ? t("work.hideCaseStudy") : t("work.readCaseStudy")}
        <Icon
          name="arrow"
          size={14}
          className={expanded ? "fp__toggle-icon fp__toggle-icon--open" : "fp__toggle-icon"}
        />
      </button>

      {expanded ? (
        <div className="fp__case-study" id={caseStudyId}>
          <h4 className="visually-hidden">
            {t("work.caseStudyLabel")} {t(project.titleKey)}
          </h4>
          {project.caseStudy.map((part) => (
            <div className="fp__cs-part" key={part.titleKey}>
              <h5 className="fp__cs-title">{t(part.titleKey)}</h5>
              <p className="fp__cs-body">{t(part.bodyKey)}</p>
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  );
}
