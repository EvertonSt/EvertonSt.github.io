import { useLanguage } from "../../i18n/context";
import { proofMetrics } from "../../data/skills";
import "./ProofStrip.css";

/**
 * The numbers, with their provenance.
 *
 * Each figure carries the project it came from. That is the difference between
 * a claim and a measurement: a reader can open the repository and check the
 * test count, and the provenance line makes clear which numbers are the
 * project's and which are about the track record as a whole.
 */
export function ProofStrip() {
  const { t } = useLanguage();

  return (
    <section className="proof" aria-labelledby="proof-title">
      <div className="proof__inner">
        <div className="proof__heading">
          <h2 className="proof__title" id="proof-title">
            {t("proof.title")}
          </h2>
          <p className="proof__note">{t("proof.note")}</p>
        </div>

        <dl className="proof__grid">
          {proofMetrics.map((metric) => (
            <div className="proof__card" key={`${metric.value}-${metric.sourceKey}`}>
              <dt className="visually-hidden">{t(metric.labelKey)}</dt>
              <dd>
                <span className="proof__value">{metric.value}</span>
                <span className="proof__label">{t(metric.labelKey)}</span>
                <span className="proof__source">{t(metric.sourceKey)}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
