import eslint from '@eslint/js';
import tseslint from 'typescript-eslint'
import playwright from 'eslint-plugin-playwright'

export default tseslint.config({
  files: ['e2e/*.ts'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    playwright.configs['flat/recommended']
  ],
  rules: {
      ...playwright.configs['flat/recommended'].rules,
      "require-await": "off",
      "@typescript-eslint/require-await": "error"
  },
  languageOptions: {
    parserOptions: {
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
});