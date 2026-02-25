import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import'

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', 'dist', 'build'],
    languageOptions: {
      parser: typescriptEslintParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'readonly',
      },
    },
    plugins: {
      'react': eslintPluginReact,
      'prettier': eslintPluginPrettier,
      'unusedImports': eslintPluginUnusedImports,
      'simpleImportSort': eslintPluginSimpleImportSort,
      '@typescript-eslint': typescriptEslintPlugin,
      'unused-imports': eslintPluginUnusedImports,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'import': importPlugin,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^components',
          args: 'after-used',
          argsIgnorePattern: '^components',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      'unused-imports/no-unused-imports': 'error',
      'simple-import-sort/imports': 'off',
      'simple-import-sort/exports': 'error',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',
      'import/no-cycle': 'error',
    },
  },
]
