import { defineConfig } from "vite";
import { emberSsg } from "vite-ember-ssr/vite-plugin";

import docfy from "@docfy/ember-vite";
import { loadTranslations } from "@ember-intl/vite";
import { ember } from "@nullvoxpopuli/ember-vite";

import docfyConfig from "./docfy.config.mjs";

const isTest = process.env.EMBER_ENV === "test";

export default defineConfig({
  plugins: [
    /**
     * Docfy adds its own plugins to the config object that it receives.
     * The prerender step builds a second time,
     * so each build gets its own lists.
     */
    docfy({
      root: import.meta.dirname,
      config: { ...docfyConfig, plugins: [], remarkPlugins: [] },
    }),
    ember(),
    loadTranslations(),
    !isTest &&
      emberSsg({
        routes: ["index", "docs", "docs/templates", "docs/components"],
      }),
  ],
});
