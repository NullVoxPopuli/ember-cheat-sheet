import { settled } from "@ember/test-helpers";

import utils from "@percy/sdk-utils";

interface PercyDOM {
  serialize(options: { domTransformation: (dom: Document) => void }): unknown;
}

/**
 * Makes the snapshot show the app without the QUnit page around it.
 */
function onlyTheApp(dom: Document) {
  const app = dom.querySelector("#ember-testing");

  if (!app) return;

  dom.body.replaceChildren(...app.children);
  app.removeAttribute("id");
}

/**
 * The Percy CLI serves its DOM library as a script,
 * and the library puts itself on the window.
 */
async function percyDOM() {
  const global = window as unknown as { PercyDOM?: PercyDOM };

  if (!global.PercyDOM) {
    const script = document.createElement("script");

    script.textContent = await utils.fetchPercyDOM();
    document.head.append(script);
  }

  return global.PercyDOM;
}

/**
 * Does nothing when the tests do not run through `percy exec`.
 */
export async function percySnapshot(assert: Assert) {
  if (!(await utils.isPercyEnabled())) return;

  const { module, testName } = (assert as unknown as { test: QUnitTest }).test;
  const dom = await percyDOM();

  if (!dom) return;

  await settled();

  await utils.postSnapshot({
    name: `${module.name} | ${testName}`,
    url: document.URL,
    domSnapshot: dom.serialize({ domTransformation: onlyTheApp }),
    clientInfo: "ember-cheat-sheet",
    environmentInfo: "ember",
  });
}

interface QUnitTest {
  module: { name: string };
  testName: string;
}
