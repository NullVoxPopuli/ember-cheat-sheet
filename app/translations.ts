import enUs from "virtual:ember-intl/translations/en-us";
import eo from "virtual:ember-intl/translations/eo";
import es from "virtual:ember-intl/translations/es";
import frFr from "virtual:ember-intl/translations/fr-fr";
import ja from "virtual:ember-intl/translations/ja";
import ptBr from "virtual:ember-intl/translations/pt-br";
import tr from "virtual:ember-intl/translations/tr";

import type IntlService from "ember-intl/services/intl";

export const defaultLocale = "en-US";

/*
  To help with maintenance, please list
  the supported locales in alphabetical order.
*/
const translations = {
  "en-US": enUs,
  eo,
  es,
  "fr-FR": frFr,
  ja,
  "pt-BR": ptBr,
  tr,
};

export type Locale = keyof typeof translations;

export const supportedLocales = new Set(Object.keys(translations) as Locale[]);

export function isSupportedLocale(locale: string): locale is Locale {
  return supportedLocales.has(locale as Locale);
}

export function addTranslations(intl: IntlService) {
  for (const locale of supportedLocales) {
    intl.addTranslations(locale, translations[locale]);
  }
}
