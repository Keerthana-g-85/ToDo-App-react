import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } }, },
   rules : {
      // Prevent unused variables
      'no-unused-vars': 'warn',

      // Prevent using console.log in production
      'no-console': 'warn',

      // Prevent declaring variables with var
      'no-var': 'error',

      // Prefer const if variable is not reassigned
      'prefer-const': 'warn',

      // Prevent duplicate imports
      'no-duplicate-imports': 'error',

      // Require semicolons
      'semi': ['error', 'never'],

      // Enforce single quotes
      'quotes': ['error', 'single'],

      // Prevent extra spaces
      'no-multi-spaces': 'warn',

      // Require spacing inside curly braces
      'object-curly-spacing': ['error', 'always'],

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
   },
  },
])
