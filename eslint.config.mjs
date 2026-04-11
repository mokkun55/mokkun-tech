import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**"],
  },
  ...eslintPluginAstro.configs["flat/recommended"],
  {
    rules: {
      "no-console": "error",
      "no-unused-vars": [
        "error",
        {
          args: "after-used",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "astro/no-set-html-directive": "error",
      "astro/no-unused-css-selector": "warn",
    },
  },
];
