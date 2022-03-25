/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/no-setup-props-destructure": "off",
    "vue/multi-word-component-names": "off",
  },
};
