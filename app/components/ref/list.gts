import { t } from "ember-intl";

import ApiDocsLink from "./api-docs-link.gts";
import GuidesLink from "./guides-link.gts";
import RfcLink from "./rfc-link.gts";

import type { TOC } from "@ember/component/template-only";

const RefList: TOC<{
  Blocks: {
    default: [
      {
        api: typeof ApiDocsLink;
        guide: typeof GuidesLink;
        rfc: typeof RfcLink;
      },
    ];
  };
}> = <template>
  <div class="references">
    <h4>{{t "refs.title"}}</h4>

    <ul>
      {{yield (hash api=ApiDocsLink guide=GuidesLink rfc=RfcLink)}}
    </ul>
  </div>
</template>;

export default RefList;
