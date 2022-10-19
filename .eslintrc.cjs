module.exports = {
  env: {
    es2022: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:unicorn/all",
    "plugin:prettier/recommended",
    "plugin:jest/recommended",
    "plugin:jest-extended/all",
    "plugin:jest-formatting/strict",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "import", "prefer-arrow"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: true,
        classPropertiesAllowed: false,
      },
    ],
    "unicorn/no-keyword-prefix": ["error", { disallowedPrefixes: ["new"] }],
    "unicorn/no-null": "off",
    "unicorn/no-useless-undefined": "off",
  },
  overrides: [
    {
      files: ["index.ts"],
      rules: {
        "unicorn/no-empty-file": "off",
      },
    },
  ],
  settings: {
    jest: {
      version: 29,
    },
  },
};
