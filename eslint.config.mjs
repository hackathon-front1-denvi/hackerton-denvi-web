import typescriptEslint from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import unusedImports from 'eslint-plugin-unused-imports'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import nextPlugin from '@next/eslint-plugin-next'

export default [
  {
    ignores: [
      'dist',
      'node_modules',
      '.next/**',
      '*.svelte',
      '*.snap',
      '*.d.ts',
      'coverage',
      'js_test',
      'local-data',
      'prisma/**',
      'electron-builder.config.cjs',
      'scripts/**',
    ],
  },
  {
    files: ['**/*.{js,ts,tsx}'],
    ignores: ['**/*.d.ts', 'prisma/**', 'scripts/**'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
      globals: {
        node: true,
        jest: true,
      },
    },
    plugins: {
      'unused-imports': unusedImports,
      '@typescript-eslint': typescriptEslint,
      'prettier': prettier,
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'object-shorthand': 'error',
      'unused-imports/no-unused-imports': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'prettier/prettier': [
        'error',
        // 개인 선호에 따라 prettier 문법 적용
        {
          singleQuote: true,
          semi: false,
          useTabs: false,
          tabWidth: 2,
          trailingComma: 'all',
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
          printWidth: 120,
        },
      ],
    },
  },
]
