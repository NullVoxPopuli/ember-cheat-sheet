import Route from "@ember/routing/route";
import { service } from "@ember/service";

import type RouterService from "@ember/routing/router-service";

export default class Index extends Route {
  @service declare router: RouterService;

  beforeModel() {
    /**
     * Docfy emits every page below its URL prefix,
     * so the root URL goes to the first Docfy page.
     */
    this.router.replaceWith("docs");
  }
}
