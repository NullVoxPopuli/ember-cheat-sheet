import { bootRehydrated } from "vite-ember-ssr/client";

import config from "#config";

import Application from "./app.ts";

bootRehydrated(Application, config);
