import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/context";
import { links } from "../../data/links";
import { profile } from "../../data/site";
import { experience } from "../../data/experience";
import { skillCategories } from "../../data/skills";
import { flagshipProjects, STATUS_LABEL_KEYS } from "../../data/projects";
import "./Resume.css";

/**
 * The résumé, on the page.
 *
 * Written as a single semantic column rather than the layout the rest of the
 * site uses, for one reason: applicant tracking systems parse a flat document
 * structure. A two-column hero with an absolutely positioned sidebar is
 * unreadable to most of them, and a résumé that cannot be parsed cannot be
 * ranked. The visual design lives on the page; this section is the document.
 *
 * The same content is generated into a PDF and a plain-text file from this
 * data by `scripts/generate-cv.mjs`, and `scripts/verify-cv.mjs` fails the
 * build when the generated files drift from what is rendered here.
 */
export function Resume() {
  const { t } = useLanguage();

  return (
    <section className="section resume" id="resume" aria-labelledby="resume-title">
      <div className="section-inner">
        <SectionHeading id="resume-title" title={t("resume.title")} subtitle={t("resume.subtitle")} />

        <div className="resume__actions no-print">
          <Button variant="primary" size="md" href={links.resumePdf}>
            <Icon name="download" size={16} />
            {t("resume.downloadPdf")}
          </Button>
          <Button variant="secondary" size="md" href={links.resumeTxt}>
            <Icon name="document" size={16} />
            {t("resume.downloadTxt")}
          </Button>
          <Button variant="ghost" size="md" onClick={() => window.print()}>
            <Icon name="print" size={16} />
            {t("resume.print")}
          </Button>
        </div>

        <article className="resume__body">
          <header className="resume__header">
            <h3 className="resume__name">{profile.name}</h3>
            <p className="resume__role">{profile.role}</p>
            <ul className="resume__contact">
              <li>
                <a href={links.emailHref}>{links.email}</a>
              </li>
              <li>
                <a href={links.github} target="_blank" rel="noopener noreferrer">
                  {links.github.replace("https://", "")}
                </a>
              </li>
              <li>
                <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                {profile.city}, {profile.region}, {profile.country} · {profile.timezone}
              </li>
            </ul>
          </header>

          <ResumeBlock title={t("resume.summaryLabel")}>
            <p>{t("about.p1")}</p>
            <p>{t("about.p3")}</p>
          </ResumeBlock>

          <ResumeBlock title={t("resume.experienceLabel")}>
            {experience.map((entry) => (
              <div className="resume__entry" key={entry.id}>
                <p className="resume__entry-head">
                  <strong>{t(entry.titleKey)}</strong>
                  <span>
                    {t(entry.companyKey)} · {entry.period} · {entry.location}
                  </span>
                </p>
                <ul className="resume__bullets">
                  {entry.achievementKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ResumeBlock>

          <ResumeBlock title={t("resume.projectsLabel")}>
            {flagshipProjects.map((project) => (
              <div className="resume__entry" key={project.id}>
                <p className="resume__entry-head">
                  <strong>{t(project.titleKey)}</strong>
                  <span>{t(STATUS_LABEL_KEYS[project.status])}</span>
                </p>
                <p className="resume__entry-body">{t(project.subtitleKey)}</p>
                <ul className="resume__bullets resume__bullets--tight">
                  {project.links.map((link) => (
                    <li key={link.url}>{link.url}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ResumeBlock>

          <ResumeBlock title={t("resume.stackLabel")}>
            {skillCategories.map((category) => (
              <p className="resume__skills" key={category.id}>
                <strong>{t(category.titleKey)}: </strong>
                {category.skills.join(", ")}
              </p>
            ))}
          </ResumeBlock>
        </article>
      </div>
    </section>
  );
}

function ResumeBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="resume__block">
      <h4 className="resume__block-title">{title}</h4>
      {children}
    </section>
  );
}
