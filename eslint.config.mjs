// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSecurity from 'eslint-plugin-security';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'dist', 'node_modules', '*.js'],
  },

  // Configuración base recomendada de ESLint
  eslint.configs.recommended,

  // Reglas TypeScript estrictas con chequeo de tipos
  ...tseslint.configs.recommendedTypeChecked,

  // Plugins adicionales para buenas prácticas
  eslintPluginSecurity.configs.recommended,
  eslintPluginUnicorn.configs.recommended,

  // Formato con Prettier sin conflictos
  eslintPluginPrettierRecommended,

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    rules: {
      // --- TypeScript ---
      '@typescript-eslint/no-explicit-any': 'warn', // No abusar de `any`
      '@typescript-eslint/no-floating-promises': 'error', // Prevenir promesas olvidadas
      '@typescript-eslint/explicit-function-return-type': 'warn', // Retornos explícitos
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // --- Importaciones ---
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always',
        },
      ],

      // --- Seguridad ---
      'security/detect-object-injection': 'off', // Nest usa DTOs tipados
      'security/detect-non-literal-fs-filename': 'warn',

      // --- Unicorn (mejores prácticas JS) ---
      'unicorn/prefer-module': 'off', // Usamos CommonJS en Nest
      'unicorn/prevent-abbreviations': 'off',

      // --- Prettier ---
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 100,
          tabWidth: 2,
          semi: true,
        },
      ],
    },
  },
);
