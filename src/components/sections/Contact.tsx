import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { SectionHeading } from "../ui/SectionHeading";
import { useLanguage } from "../../i18n/context";
import { links } from "../../data/links";
import { profile } from "../../data/site";
import type { TranslationKey } from "../../i18n/en";
import "./Contact.css";

const ROLES: TranslationKey[] = ["contact.role1", "contact.role2", "contact.role3"];

/**
 * The section a recruiter arrives at.
 *
 * Email is the primary action and is shown as visible text rather than hidden
 * behind an "Email me" label: an address a reader has to click through a mail
 * client to read is an address they cannot search for or forward, and it costs
 * nothing to print it. The response-time line is a claim, so it says what is
 * actually true - typical, not guaranteed.
 */
export function Contact() {
  const { t } = useLanguage();

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-inner contact__inner">
        <SectionHeading
          id="contact-title"
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
          centered
        />

        <div className="contact__primary">
          <a className="contact__email" href={links.emailHref}>
            <Icon name="mail" size={20} />
            {links.email}
          </a>
          <p className="contact__response">
            <Icon name="clock" size={14} />
            {t("contact.responseTime")}
          </p>
        </div>

        <div className="contact__actions">
          <Button variant="primary" size="lg" href={links.emailHref}>
            <Icon name="mail" size={16} />
            {t("contact.emailLabel")}
          </Button>
          <Button variant="secondary" size="lg" href={links.resumePdf}>
            <Icon name="download" size={16} />
            {t("resume.downloadPdf")}
          </Button>
          <Button variant="secondary" size="lg" href={links.github} external>
            <Icon name="github" size={16} />
            {t("contact.githubLabel")}
          </Button>
          <Button variant="secondary" size="lg" href={links.linkedin} external>
            <Icon name="linkedin" size={16} />
            {t("contact.linkedinLabel")}
          </Button>
        </div>

        <div className="contact__roles">
          <h3 className="contact__roles-title">{t("contact.openRoles")}</h3>
          <ul className="contact__roles-list">
            {ROLES.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
          <p className="contact__meta">
            {profile.city}, {profile.region} · {profile.timezone} · {profile.remotePreference}
          </p>
        </div>
      </div>
    </section>
  );
}
