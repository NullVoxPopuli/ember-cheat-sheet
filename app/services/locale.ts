import Service, { service } from "@ember/service";

import { isSupportedLocale, supportedLocales } from "../translations.ts";

import type IntlService from "ember-intl/services/intl";

export default class LocaleService extends Service {
  @service declare intl: IntlService;

  get menuOptions() {
    return Array.from(supportedLocales)
      .map((locale) => {
        return {
          label: this.intl.t(`component.locale-menu.locale-${locale}`),
          value: locale,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label, this.intl.primaryLocale));
  }

  updateSiteLocale(locale: string) {
    if (!isSupportedLocale(locale)) {
      return;
    }

    this.intl.setLocale(locale);
  }
}

declare module "@ember/service" {
  interface Registry {
    locale: LocaleService;
  }
}
