import type { TranslationKey } from "../i18n/en";
import { links } from "./links";

/**
 * Employment history. Bullet points are catalogue keys rather than strings, so
 * the same entry renders in both languages from one record and a test can
 * assert every entry carries at least two achievements.
 */
export interface ExperienceEntry {
  id: string;
  titleKey: TranslationKey;
  companyKey: TranslationKey;
  /** Free text: a period and a place are not sentences to translate. */
  period: string;
  location: string;
  arrangementKey: TranslationKey;
  achievementKeys: TranslationKey[];
  links?: { label: string; url: string }[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "independent",
    titleKey: "experience.independentTitle",
    companyKey: "experience.independentCompany",
    period: "August 2020 — Present",
    location: "Brazil",
    arrangementKey: "experience.arrangementRemote",
    achievementKeys: [
      "experience.independent1",
      "experience.independent2",
      "experience.independent3",
      "experience.independent4",
    ],
  },
  {
    id: "intern",
    titleKey: "experience.internTitle",
    companyKey: "experience.internCompany",
    period: "June 2019 — June 2020",
    location: "Paripiranga, Bahia",
    arrangementKey: "experience.arrangementOnsite",
    achievementKeys: ["experience.intern1", "experience.intern2"],
    links: [{ label: "projeto-erp", url: links.projetoErp }],
  },
];
