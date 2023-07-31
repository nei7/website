module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  plugins: [],
  rules: {
    camelcase: "off",
    "vue/multi-word-component-names": "off",
    "vue/no-setup-props-destructure": "off",
    "n/no-callback-literal": "off",
    "vue/require-default-prop": "off",
    "vue/prop-name-casing": "off",
    "vue/no-v-html": "off"
  }
};
