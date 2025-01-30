import containerQueries from "@tailwindcss/container-queries";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#374151",
            "--tw-prose-headings": "#1f2937",
            "--tw-prose-links": "#3b82f6",
          },
        },
      },
    },
  },

  plugins: [typography, containerQueries],
};
