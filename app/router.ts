import EmbroiderRouter from "@embroider/router";

import { addDocfyRoutes } from "@docfy/ember";

import config from "#config";

export default class Router extends EmbroiderRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  addDocfyRoutes(this);
});
