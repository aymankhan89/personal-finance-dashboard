module.exports = {
  extends: ["eslint:recommended", "@typescript-eslint/recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "error",
    "prefer-const": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "no-unused-vars": "off",
      },
    },
  ],
};
