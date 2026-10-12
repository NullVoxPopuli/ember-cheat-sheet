import Component from "@glimmer/component";
import { concat } from "@ember/helper";
import { service } from "@ember/service";

import { t } from "ember-intl";

import type IntlService from "ember-intl/services/intl";

export default class Subsection extends Component<{
  Args: {
    /**
     * The folder of the subsection in `translations/<sectionId>/`.
     */
    id: string;
    sectionId: string;
  };
  Blocks: {
    default: [];
  };
}> {
  @service declare intl: IntlService;

  get anchor() {
    return `${this.args.sectionId}__${this.args.id}`;
  }

  get editUrl() {
    const { sectionId, id } = this.args;
    const locale = this.intl.primaryLocale.toLowerCase();

    return `https://github.com/nullvoxpopuli/ember-cheat-sheet/edit/main/translations/${sectionId}/${id}/${locale}.yml`;
  }

  <template>
    {{#let (t (concat @sectionId "." @id ".title")) as |title|}}
      <section class="subsection" aria-labelledby={{this.anchor}} data-test-subsection={{title}}>
        <div class="title-container">
          <h3 data-test-field="Subsection Title" id={{this.anchor}} class="title">
            {{title}}
          </h3>

          <a href="#{{this.anchor}}" class="permalink" title={{title}}>
            {{t "component.guide-section.section"}}
          </a>
        </div>

        <p data-test-field="Subsection Description" class="description">
          {{t (concat @sectionId "." @id ".description") htmlSafe=true}}
        </p>

        <div data-test-code>
          {{yield}}
        </div>

        <div class="edit-link-container">
          <a
            data-test-link="Edit Translation"
            href={{this.editUrl}}
            class="edit-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            {{t "component.guide-section.edit-translation-text"}}
          </a>
        </div>
      </section>
    {{/let}}
  </template>
}
