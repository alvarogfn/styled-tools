import pluginCommunityComments from "@eslint-community/eslint-plugin-eslint-comments";
import configPrettier from "eslint-config-prettier";
import { defineFlatConfig } from "eslint-define-config";
import pluginArrayFunc from "eslint-plugin-array-func";
import pluginNoSecrets from "eslint-plugin-no-secrets";
import pluginPerfectionist from "eslint-plugin-perfectionist";
import pluginPromise from "eslint-plugin-promise";
import pluginRegexp from "eslint-plugin-regexp";
import pluginUnicorn from "eslint-plugin-unicorn";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import * as typescript from "typescript-eslint";

export function mergePropertyArray(array, property) {
  return array.reduce((acc, item) => {
    return { ...acc, ...item[property] };
  }, {});
}

export default defineFlatConfig([
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.d.ts"],
    languageOptions: {
      parser: typescript.parser,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json"],
      },
    },
    plugins: {
      "@typescript-eslint": typescript.plugin,
    },
    rules: {
      ...mergePropertyArray(typescript.configs.recommended, "rules"),
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json"],
        },
      },
    },
  },

  // All JS/TS
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@eslint-community/eslint-comments": pluginCommunityComments,
      "array-func": pluginArrayFunc,
      "no-secrets": pluginNoSecrets,
      perfectionist: pluginPerfectionist,
      promise: pluginPromise,
      regexp: pluginRegexp,
      unicorn: pluginUnicorn,
    },
    rules: {
      "@eslint-community/eslint-comments/no-aggregating-enable": "warn",
      "@eslint-community/eslint-comments/no-duplicate-disable": "warn",
      "@eslint-community/eslint-comments/no-unused-disable": "warn",
      "@eslint-community/eslint-comments/no-unused-enable": "warn",
      "@eslint-community/eslint-comments/require-description": "warn",
      "array-func/avoid-reverse": "warn",
      "array-func/from-map": "warn",
      "array-func/no-unnecessary-this-arg": "warn",
      "array-func/prefer-array-from": "warn",
      "array-func/prefer-flat": "warn",
      "array-func/prefer-flat-map": "warn",
      "arrow-body-style": "off",
      "no-console": "warn",
      "no-loop-func": "off",
      "no-secrets/no-secrets": "warn",
      "perfectionist/sort-array-includes": "warn",
      "perfectionist/sort-astro-attributes": "warn",
      "perfectionist/sort-enums": "warn",
      "perfectionist/sort-exports": "warn",
      "perfectionist/sort-imports": "warn",
      "perfectionist/sort-interfaces": "warn",
      "perfectionist/sort-jsx-props": "warn",
      "perfectionist/sort-maps": "warn",
      "perfectionist/sort-named-exports": "warn",
      "perfectionist/sort-named-imports": "warn",
      "perfectionist/sort-object-types": "warn",
      "perfectionist/sort-objects": "warn",
      "regexp/confusing-quantifier": "warn",
      "regexp/control-character-escape": "warn",
      "regexp/negation": "warn",
      "regexp/no-contradiction-with-assertion": "warn",
      "regexp/no-dupe-characters-character-class": "warn",
      "regexp/no-empty-alternative": "warn",
      "regexp/no-empty-capturing-group": "warn",
      "regexp/no-empty-character-class": "warn",
      "regexp/no-empty-group": "warn",
      "regexp/no-empty-lookarounds-assertion": "warn",
      "regexp/no-empty-string-literal": "warn",
      "regexp/no-escape-backspace": "warn",
      "regexp/no-extra-lookaround-assertions": "warn",
      "regexp/no-invalid-regexp": "warn",
      "regexp/no-invisible-character": "warn",
      "regexp/no-lazy-ends": "warn",
      "regexp/no-legacy-features": "warn",
      "regexp/no-misleading-capturing-group": "warn",
      "regexp/no-misleading-unicode-character": "warn",
      "regexp/no-missing-g-flag": "warn",
      "regexp/no-non-standard-flag": "warn",
      "regexp/no-obscure-range": "warn",
      "regexp/no-optional-assertion": "warn",
      "regexp/no-potentially-useless-backreference": "warn",
      "regexp/no-super-linear-backtracking": "warn",
      "regexp/no-useless-assertions": "warn",
      "regexp/no-useless-backreference": "warn",
      "regexp/no-useless-dollar-replacements": "warn",
      "unicorn/better-regex": "warn",
      "unicorn/catch-error-name": "warn",
      "unicorn/consistent-destructuring": "warn",
      "unicorn/consistent-function-scoping": "warn",
      "unicorn/escape-case": "warn",
      "unicorn/expiring-todo-comments": "warn",
      "unicorn/explicit-length-check": "warn",
      "unicorn/new-for-builtins": "warn",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-method-this-argument": "warn",
      "unicorn/no-array-push-push": "warn",
      "unicorn/no-await-expression-member": "warn",
      "unicorn/no-console-spaces": "warn",
      "unicorn/no-document-cookie": "warn",
      "unicorn/no-empty-file": "warn",
      "unicorn/no-for-loop": "warn",
      "unicorn/no-instanceof-array": "warn",
      "unicorn/no-invalid-remove-event-listener": "warn",
      "unicorn/no-lonely-if": "warn",
      "unicorn/no-negated-condition": "warn",
      "unicorn/no-nested-ternary": "warn",
      "unicorn/no-new-array": "warn",
      "unicorn/no-new-buffer": "warn",
      "unicorn/no-static-only-class": "warn",
      "unicorn/no-this-assignment": "warn",
      "unicorn/no-unnecessary-await": "warn",
      "unicorn/no-unnecessary-polyfills": "warn",
      "unicorn/no-unreadable-array-destructuring": "warn",
      "unicorn/no-unreadable-iife": "warn",
      "unicorn/no-unused-properties": "warn",
      "unicorn/no-useless-fallback-in-spread": "warn",
      "unicorn/no-useless-length-check": "warn",
      "unicorn/no-useless-promise-resolve-reject": "warn",
      "unicorn/no-useless-spread": "warn",
      "unicorn/no-useless-switch-case": "warn",
      "unicorn/no-useless-undefined": "warn",
      "unicorn/no-zero-fractions": "warn",
      "unicorn/number-literal-case": "warn",
      "unicorn/numeric-separators-style": "warn",
      "unicorn/prefer-add-event-listener": "warn",
      "unicorn/prefer-array-find": "warn",
      "unicorn/prefer-array-index-of": "warn",
      "unicorn/prefer-array-some": "warn",
      "unicorn/prefer-at": "warn",
      "unicorn/prefer-blob-reading-methods": "warn",
      "unicorn/prefer-code-point": "warn",
      "unicorn/prefer-date-now": "warn",
      "unicorn/prefer-default-parameters": "warn",
      "unicorn/prefer-dom-node-append": "warn",
      "unicorn/prefer-dom-node-dataset": "warn",
      "unicorn/prefer-dom-node-remove": "warn",
      "unicorn/prefer-dom-node-text-content": "warn",
      "unicorn/prefer-event-target": "warn",
      "unicorn/prefer-export-from": "warn",
      "unicorn/prefer-includes": "warn",
      "unicorn/prefer-json-parse-buffer": "warn",
      "unicorn/prefer-keyboard-event-key": "warn",
      "unicorn/prefer-logical-operator-over-ternary": "warn",
      "unicorn/prefer-modern-dom-apis": "warn",
      "unicorn/prefer-modern-math-apis": "warn",
      "unicorn/prefer-native-coercion-functions": "warn",
      "unicorn/prefer-negative-index": "warn",
      "unicorn/prefer-node-protocol": "warn",
      "unicorn/prefer-number-properties": "warn",
      "unicorn/prefer-object-from-entries": "warn",
      "unicorn/prefer-optional-catch-binding": "warn",
      "unicorn/prefer-prototype-methods": "warn",
      "unicorn/prefer-query-selector": "warn",
      "unicorn/prefer-reflect-apply": "warn",
      "unicorn/prefer-regexp-test": "warn",
      "unicorn/prefer-set-has": "warn",
      "unicorn/prefer-set-size": "warn",
      "unicorn/prefer-string-replace-all": "warn",
      "unicorn/prefer-string-slice": "warn",
      "unicorn/prefer-string-starts-ends-with": "warn",
      "unicorn/prefer-string-trim-start-end": "warn",
      "unicorn/prefer-switch": "warn",
      "unicorn/relative-url-style": "warn",
      "unicorn/require-array-join-separator": "warn",
      "unicorn/require-number-to-fixed-digits-argument": "warn",
      "unicorn/require-post-message-target-origin": "warn",
      "unicorn/switch-case-braces": "warn",
      "unicorn/template-indent": "warn",
      "unicorn/throw-new-error": "warn",
    },
    settings: {
      "import/parsers": {
        espree: [".js", ".cjs", ".jsx"],
      },
    },
  },

  // Vitest
  {
    files: ["**/*.test.ts"],
    languageOptions: {
      globals: {
        ...globals.jest,
        vi: false,
      },
    },
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-magic-numbers": "off",
    },
  },

  configPrettier,
]);
