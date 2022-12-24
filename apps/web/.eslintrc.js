module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "es2022",
    jsx: true,
  },
  extends: [
    "custom",
    "eslint:recommended",
    // "plugin:react/recommended",
    "plugin:react/all",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["@typescript-eslint/eslint-plugin", "react"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
    "react/jsx-indent": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-no-literals": "off",
    "react/jsx-newline": "off",
  },
}
