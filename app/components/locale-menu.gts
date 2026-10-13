import Component from "@glimmer/component";
import { service } from "@ember/service";

import { t } from "ember-intl";

import type LocaleService from "../services/locale.ts";

export default class LocaleMenu extends Component {
  @service declare locale: LocaleService;

  updateLocale = (event: Event) => {
    const { value } = event.target as HTMLSelectElement;

    this.locale.updateSiteLocale(value);
  };

  <template>
    <div class="locale-menu">
      <label for="locale-menu">
        {{t "component.locale-menu.locale-select.label"}}
      </label>

      <select
        data-test-field="Locale"
        id="locale-menu"
        class="select"
        {{on "input" this.updateLocale}}
      >
        <option value="" disabled selected>
          {{t "component.locale-menu.locale-select.placeholder"}}
        </option>

        {{#each this.locale.menuOptions as |menuOption|}}
          <option data-test-option value={{menuOption.value}}>
            {{menuOption.label}}
          </option>
        {{/each}}
      </select>
    </div>
  </template>
}
