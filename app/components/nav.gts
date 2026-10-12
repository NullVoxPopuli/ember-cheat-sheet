import { LinkTo } from "@ember/routing";

import { t } from "ember-intl";

<template>
  <nav>
    <LinkTo @route="docs.index">
      {{t "nav.home"}}
    </LinkTo>

    <span>|</span>

    <LinkTo @route="docs.templates">
      {{t "nav.templates"}}
    </LinkTo>

    <span>|</span>

    <LinkTo @route="docs.components">
      {{t "nav.components"}}
    </LinkTo>
  </nav>
</template>
