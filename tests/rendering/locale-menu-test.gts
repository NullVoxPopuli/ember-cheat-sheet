import { fillIn, render } from "@ember/test-helpers";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";

import { supportedLocales } from "#app/translations.ts";
import LocaleMenu from "#components/locale-menu.gts";
import { setupTranslations } from "#test-helpers/translations.ts";

module("Rendering | locale-menu", function (hooks) {
  setupRenderingTest(hooks);
  setupTranslations(hooks);

  test("renders options for supported locales", async function (assert) {
    await render(<template><LocaleMenu /></template>);

    assert.dom('[data-test-field="Locale"]').hasValue("", "The default option is selected.");

    assert
      .dom("[data-test-option]")
      .exists(
        { count: supportedLocales.size },
        `There are ${supportedLocales.size} non-default options.`,
      );
  });

  test("allows the user to update the site locale", async function (assert) {
    const intl = this.owner.lookup("service:intl");

    await render(<template><LocaleMenu /></template>);

    await fillIn('[data-test-field="Locale"]', "pt-BR");

    assert.strictEqual(intl.primaryLocale, "pt-BR", "The site locale is pt-BR.");

    await fillIn('[data-test-field="Locale"]', "fr-FR");

    assert.strictEqual(intl.primaryLocale, "fr-FR", "The site locale is fr-FR.");
  });
});
