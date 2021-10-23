import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | locale', function (hooks) {
  setupTest(hooks);

  test('menuOptions includes user-friendly labels', function (assert) {
    const locale = this.owner.lookup('service:locale');

    assert.deepEqual(
      locale.menuOptions.map(({ label }) => label),
      ['English (US)', 'Français', 'Português (do Brasil)', 'Spanish', 'Türkçe', '日本語']
    );
  });
});
