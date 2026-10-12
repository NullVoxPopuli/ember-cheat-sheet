/**
 * This config simultaneously supports apps, libraries, typescript, etc.
 *
 * but in a way that abstracts the dependencies and configuration
 * out of your project.
 *
 * Handles: (G)TS + (G)JS, QUnit, Supporting Node files
 *          for apps and libraries
 */
import { configs } from "@nullvoxpopuli/eslint-configs";

export default [
  ...configs.ember(import.meta.dirname),
  // your modifications here
  // see: https://eslint.org/docs/user-guide/configuring/configuration-files#how-do-overrides-work
];
