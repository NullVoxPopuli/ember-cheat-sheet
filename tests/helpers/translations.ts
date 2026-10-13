import { getContext } from "@ember/test-helpers";

import { addTranslations, defaultLocale } from "#app/translations.ts";

import type { TestContext } from "@ember/test-helpers";

/**
 * Rendering tests and unit tests do not run the application route,
 * which is what loads the translations in the app.
 */
export function setupTranslations(hooks: NestedHooks) {
  hooks.beforeEach(function () {
    const { owner } = getContext() as TestContext;
    const intl = owner.lookup("service:intl");

    addTranslations(intl);
    intl.setLocale(defaultLocale);
  });
}
