import Route from "@ember/routing/route";
import { service } from "@ember/service";

import { addTranslations, defaultLocale } from "../translations.ts";

import type IntlService from "ember-intl/services/intl";

export default class Application extends Route {
  @service declare intl: IntlService;

  beforeModel() {
    addTranslations(this.intl);

    this.intl.setLocale(defaultLocale);
  }
}
