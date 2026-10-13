import { defineConfig } from "vite";
import { emberSsg } from "vite-ember-ssr/vite-plugin";

import docfy from "@docfy/ember-vite";
import { loadTranslations } from "@ember-intl/vite";
import { ember } from "@nullvoxpopuli/ember-vite";

import docfyConfig from "./docfy.config.mjs";

const isTest = process.env.EMBER_ENV === "test";

export default defineConfig({
  plugins: [
    docfy({ root: import.meta.dirname, config: docfyConfig }),
    ember(),
    loadTranslations(),
    !isTest &&
      emberSsg({
        routes: ["index", "docs", "docs/templates", "docs/components"],
      }),
  ],
});
