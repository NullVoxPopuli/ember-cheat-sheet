import "./styles/app.css";

import Application from "@ember/application";

import { DocfyService } from "@docfy/ember";
import IntlService from "ember-intl/services/intl";
import PageTitleService from "ember-page-title/services/page-title";

import Router from "./router.ts";

export default class App extends Application {
  modules = {
    "./router": Router,
    ...import.meta.glob("./routes/**/*", { eager: true }),
    ...import.meta.glob("./templates/**/*", { eager: true }),
    ...import.meta.glob("./services/**/*", { eager: true }),
    "./services/docfy": DocfyService,
    "./services/intl": IntlService,
    "./services/page-title": PageTitleService,
  };
}
