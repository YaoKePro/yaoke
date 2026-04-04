import adapter from "@sveltejs/adapter-static";

import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";

const theme = "github-dark";
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ["javascript", "typescript", "python"],
});

const mdsvexOptions = {
  extensions: [".svx", ".md"],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
      return `{@html \`${html}\` }`;
    },
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ strict: false }),
  },

  preprocess: [mdsvex(mdsvexOptions)],
  extensions: [".svelte", ".svx", ".md"],
};

export default config;
