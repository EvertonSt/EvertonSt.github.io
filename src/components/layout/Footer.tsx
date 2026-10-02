import { Icon } from "../ui/Icon";
import { useLanguage } from "../../i18n/context";
import { links } from "../../data/links";
import { profile } from "../../data/site";
import "./Footer.css";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__identity">
          <p className="footer__name">{profile.name}</p>
          <p className="footer__tagline">{t("footer.tagline")}</p>
          <p className="footer__meta">
            <a href={links.emailHref}>{links.email}</a>
            <span aria-hidden="true"> · </span>
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <span aria-hidden="true"> · </span>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </div>

        <div className="footer__social">
          <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon name="github" size={20} />
          </a>
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" size={20} />
          </a>
          <a href={links.emailHref} aria-label={t("contact.emailLabel")}>
            <Icon name="mail" size={20} />
          </a>
        </div>
      </div>

      <div className="footer__legal">
        <p>{t("footer.builtWith")}</p>
        <p>
          © {year} {profile.name}. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
