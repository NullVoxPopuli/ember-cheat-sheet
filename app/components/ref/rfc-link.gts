import { concat } from "@ember/helper";

import { t } from "ember-intl";

import type { TOC } from "@ember/component/template-only";

const RfcLink: TOC<{
  Args: {
    /**
     * The pull request number in emberjs/rfcs.
     * `translations/refs/` must have a title for it.
     */
    id: string;
  };
}> = <template>
  <li>
    <a
      href="https://github.com/emberjs/rfcs/pull/{{@id}}"
      target="_blank"
      rel="noreferrer noopener"
    >
      {{t (concat "refs.rfcs." @id)}}
    </a>
  </li>
</template>;

export default RfcLink;
