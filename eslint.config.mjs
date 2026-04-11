import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/**", "node_modules/**", ".astro/"],
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
  eslintConfigPrettier,
];
