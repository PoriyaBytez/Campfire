module.exports = {
  root: true,
  extends: [
    "@react-native",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    "no-shadow": "off",
    "import/no-unresolved": "off",
    "no-useless-escape": "false",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-shadow": "error",
    "react-native/no-inline-styles": 0,
    "import/no-named-as-default": 0,
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/nov-var-requires": 0,
    "react/no-unstable-nested-components": 0,
  },
};
