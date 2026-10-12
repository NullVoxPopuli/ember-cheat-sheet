import App from "./app.ts";

export { settled } from "@ember/test-helpers";

export function createSsrApp() {
  return App.create({ autoboot: false });
}
