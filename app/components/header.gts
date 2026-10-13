import { faEmber } from "@fortawesome/free-brands-svg-icons";
import { t } from "ember-intl";

import LocaleMenu from "./locale-menu.gts";

const [width, height] = faEmber.icon;
const outline = String(faEmber.icon[4]);

<template>
  <header class="header">
    <div class="logo-with-title">
      <svg class="logo" viewBox="0 0 {{width}} {{height}}" aria-hidden="true">
        <path fill="currentColor" d={{outline}} />
      </svg>

      <h1 class="subtitle">
        <span class="sr-only">{{t "layout.application.title"}}</span>
        <span class="not-sr-only">{{t "layout.application.shortTitle"}}</span>
      </h1>
    </div>

    <LocaleMenu />
  </header>
</template>
