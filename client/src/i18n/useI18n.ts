import { Translations, messages } from "./messages";

export type Lang = "es" | "en";

export const DEFAULT_LANG: Lang = "en"; // o "es"

export function useI18n(lang: Lang = DEFAULT_LANG): Translations {
  return messages[lang];
}

