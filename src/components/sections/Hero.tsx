import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { useLanguage } from "../../i18n/context";
import { links } from "../../data/links";
import "./Hero.css";

/**
 * The five-second answer.
 *
 * A visitor decides whether to keep reading from three things in order: what
 * role this person wants, what they have done that proves they can do it, and
 * how to reach them. All three are above the fold, in that order, with the
 * résumé download as the primary action - on a portfolio the most common
 * conversion is not an email, it is a recruiter saving the CV.
 */
export function Hero() {
  const { t, tList } = useLanguage();

  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero__inner">
        <p className="hero__availability">
          <span className="hero__availability-dot" aria-hidden="true" />
          {t("hero.availability")}
        </p>

        <p className="hero__role">{t("hero.roleLine")}</p>

        <h1 className="hero__title" id="hero-title">
          {t("hero.title")}
        </h1>

        <p className="hero__subtitle">{t("hero.subtitle")}</p>

        <ul className="hero__skills" aria-label={t("stack.title")}>
          {tList("hero.skills").map((skill) => (
            <li key={skill} className="hero__skill">
              {skill}
            </li>
          ))}
        </ul>

        <div className="hero__actions">
          <Button variant="primary" size="lg" href="#work">
            {t("hero.primaryCta")}
            <Icon name="arrow" size={16} />
          </Button>
          <Button variant="secondary" size="lg" href={links.resumePdf}>
            <Icon name="download" size={16} />
            {t("hero.resumeCta")}
          </Button>
          <Button variant="ghost" size="lg" href={links.github} external>
            <Icon name="github" size={16} />
            {t("hero.githubCta")}
          </Button>
          <Button variant="ghost" size="lg" href={links.linkedin} external>
            <Icon name="linkedin" size={16} />
            {t("hero.linkedinCta")}
          </Button>
        </div>

        {/*
          A plain list, not a description list. These are three facts about the
          author, not term/definition pairs, and a <dt> with no matching term
          turns the group into three definitions of the word "Contact" for a
          screen reader.
        */}
        <ul className="hero__meta">
          <li className="hero__meta-item">
            <Icon name="globe" size={15} />
            {t("hero.location")}
          </li>
          <li className="hero__meta-item">{t("hero.workAuth")}</li>
          <li className="hero__meta-item">{t("hero.languages")}</li>
        </ul>
      </div>
    </section>
  );
}
