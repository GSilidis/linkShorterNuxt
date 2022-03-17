module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jquery": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "parser": "@babel/eslint-parser"
  },
  "plugins": [
    "vue",
  ],
  "rules": {
    "brace-style": [
      "error",
      "1tbs"
    ],
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "always-multiline"
    }],
    "eol-last": ["error", "always"],
    "indent": ["error", 4],
    "key-spacing": ["error", { "afterColon": true, "mode": "strict" }],
    "linebreak-style": ["error", "unix"],
    "max-depth": ["error", 4],
    "max-nested-callbacks": ["error", 3],
    "max-statements": ["error", 20, { "ignoreTopLevelFunctions": true }],
    "no-console": "off",
    "no-inner-declarations": "error",
    "no-global-assign": "error",
    "no-lonely-if": "error",
    "no-prototype-builtins": "error",
    "no-redeclare": "error",
    "no-useless-escape": "error",
    "no-undef": "error",
    "no-unneeded-ternary": "error",
    "no-unsafe-negation": "error",
    "no-unused-vars": "error",
    "object-curly-spacing": ["error", "always"],
    "operator-linebreak": ["error", "none"],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "function", next: "function" },
      { blankLine: "always", prev: "block", next: "block" },
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: "var", next: "if" },
    ],
    "semi": ["error", "always"],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "quotes": ["error", "single"],
    "vue/html-indent": ["error", 4],
    "vue/multi-word-component-names": 0,
    "vue/singleline-html-element-content-newline": "off",
    "vue/require-default-prop": "off",
  }
};
