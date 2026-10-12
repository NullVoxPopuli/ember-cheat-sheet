import rehypeShiki from "@shikijs/rehype/core";
import { createHighlighter } from "shiki";

const theme = "github-light";

/**
 * Docfy runs its markdown pipeline synchronously,
 * so the highlighter must exist before the pipeline starts.
 */
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ["glimmer-js", "glimmer-ts", "handlebars", "javascript", "typescript", "bash"],
});

export default {
  repository: {
    url: "https://github.com/nullvoxpopuli/ember-cheat-sheet",
    editBranch: "main",
  },
  rehypePlugins: [[rehypeShiki, highlighter, { theme }]],
  sources: [
    {
      root: new URL("./docs", import.meta.url).pathname,
      pattern: "**/*.md",
      urlPrefix: "docs",
    },
  ],
};
