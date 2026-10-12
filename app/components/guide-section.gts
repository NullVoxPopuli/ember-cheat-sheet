import { concat } from "@ember/helper";

import { t } from "ember-intl";

import Subsection from "./subsection.gts";

import type { TOC } from "@ember/component/template-only";
import type { WithBoundArgs } from "@glint/template";

const GuideSection: TOC<{
  Args: {
    /**
     * The folder of the section in `translations/`.
     */
    id: string;
  };
  Blocks: {
    default: [WithBoundArgs<typeof Subsection, "sectionId">];
  };
}> = <template>
  {{#let (t (concat @id ".title")) as |sectionTitle|}}
    <section class="guide-section" aria-labelledby={{@id}} data-test-section={{sectionTitle}}>
      <div class="title-container">
        <h2 data-test-field="Section Title" id={{@id}} class="title">
          {{sectionTitle}}
        </h2>

        <a href="#{{@id}}" class="permalink" title={{sectionTitle}}>
          {{t "component.guide-section.section"}}
        </a>
      </div>

      {{yield (component Subsection sectionId=@id)}}
    </section>
  {{/let}}
</template>;

export default GuideSection;
