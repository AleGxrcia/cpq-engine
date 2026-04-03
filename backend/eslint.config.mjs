import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig(
  // Ignorar archivos y carpetas
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '**/*.js',
      '**/*.mjs',
      '**/*.d.ts',
    ],
  },
  // Configuracion base y reglas comunes
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Reglas principales
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Tipado y reglas de TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-unused-vars': [
          'warn',
          {
              argsIgnorePattern: '^_',
              varsIgnorePattern: '^_',
          },
      ],

      // Calidad y estilo de código
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'no-duplicate-imports': 'error',
      'no-useless-constructor': 'error',

      // Seguridad
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-process-env': 'warn',
    },
  },
  // Entornos de pruebas (Test files)
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      'no-process-env': 'off',
    },
  },
  eslintConfigPrettier
);