import nextConfig from 'eslint-config-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // We don't want to lint generated files nor node_modules
    ignores: ['node_modules/**', '.next/**', '.out/**', 'next-env.d.ts'],
  },
  {
    linterOptions: { reportUnusedDisableDirectives: 'off' },
  },
  ...nextConfig,
  {
    // Only the classic hooks rules, not the React Compiler ones
    rules: Object.fromEntries(
      Object.keys(reactHooks.rules).map((rule) => [
        `react-hooks/${rule}`,
        'off',
      ])
    ),
  },
  {
    // This configuration will apply only to TypeScript files
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tseslint.configs.recommended],
    rules: {
      ...react.configs.flat.recommended.rules, // React rules
      ...jsxA11y.flatConfigs.recommended.rules, // Accessibility rules

      // React hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // We will use TypeScript's types for component props instead
      'react/prop-types': 'off',

      // No need to import React when using Next.js
      'react/react-in-jsx-scope': 'off',

      // This rule is not compatible with Next.js's <Link /> components
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/media-has-caption': 'off',
      'jsx-a11y/no-onchange': 'off',

      // Why would you want unused vars?
      '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }],

      // I suggest this setting for requiring return types on functions only where useful
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        },
      ],
    },
  },
  {
    // Prettier plugin, must come last
    ...prettierRecommended,
    files: ['**/*.ts', '**/*.tsx'],
  }
);
