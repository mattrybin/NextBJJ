module.exports = {
  extends: [
    // "eslint:recommended",
    // "plugin:@typescript-eslint/recommended",
    "next",
    "turbo",
    "prettier",
  ],
  // parser: "@typescript-eslint/parser",
  // parserOptions: {
  //   "ecmaVersion": ""
  // },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
}
