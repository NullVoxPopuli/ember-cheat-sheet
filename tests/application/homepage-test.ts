import { currentURL, fillIn, visit } from "@ember/test-helpers";
import { module, test } from "qunit";
import { setupApplicationTest } from "ember-qunit";

import { percySnapshot } from "#test-helpers/percy.ts";

import { a11yAudit } from "ember-a11y-testing/test-support";

module("Application | Homepage", function (hooks) {
  setupApplicationTest(hooks);

  test("the root URL shows the first page of the docs", async function (assert) {
    await visit("/");

    assert.strictEqual(currentURL(), "/docs");
    assert.dom("#nomenclature").hasText("Nomenclature");
  });

  test("Accessibility audit", async function (assert) {
    await visit("/");
    await a11yAudit();

    assert.ok(true);
  });

  test("We can change the site language", async function (assert) {
    await visit("/");

    assert.dom("#nomenclature").hasText("Nomenclature", "We see the site in English.");

    await fillIn('[data-test-field="Locale"]', "pt-BR");

    assert.dom("#nomenclature").hasText("Nomenclatura", "We see the site in Portugese (Brazil).");

    await fillIn('[data-test-field="Locale"]', "fr-FR");

    assert.dom("#nomenclature").hasText("La Nomenclature", "We see the site in French.");
  });

  for (const page of ["/docs", "/docs/templates", "/docs/components"]) {
    test(`${page} has no missing translations`, async function (assert) {
      await visit(page);

      assert.dom("[data-test-subsection]").exists();
      assert.dom("main").doesNotIncludeText("Missing translation");
    });
  }

  for (const locale of ["en-US", "eo", "es", "fr-FR", "ja", "pt-BR", "tr"]) {
    module(locale, function () {
      test("We set the correct lang attribute in <html> element", async function (assert) {
        await visit("/");
        await fillIn('[data-test-field="Locale"]', locale);

        assert.dom(document.documentElement).hasAttribute("lang", locale);
      });

      test("Percy snapshot", async function (assert) {
        await visit("/");
        await fillIn('[data-test-field="Locale"]', locale);
        await percySnapshot(assert);

        assert.ok(true);
      });
    });
  }
});
