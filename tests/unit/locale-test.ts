import { module, test } from "qunit";
import { setupTest } from "ember-qunit";

import { supportedLocales } from "#app/translations.ts";
import { setupTranslations } from "#test-helpers/translations.ts";

module("Unit | Service | locale", function (hooks) {
  setupTest(hooks);
  setupTranslations(hooks);

  test("menuOptions includes user-friendly labels", function (assert) {
    const intl = this.owner.lookup("service:intl");
    const locale = this.owner.lookup("service:locale");

    const expected = Array.from(supportedLocales)
      .map((code) => intl.t(`component.locale-menu.locale-${code}`))
      .sort((a, b) => a.localeCompare(b, "en-us"));

    assert.deepEqual(
      locale.menuOptions.map(({ label }) => label),
      expected,
    );
  });

  test("an unsupported locale changes nothing", function (assert) {
    const intl = this.owner.lookup("service:intl");
    const locale = this.owner.lookup("service:locale");

    locale.updateSiteLocale("xx");

    assert.strictEqual(intl.primaryLocale, "en-US");
  });
});
