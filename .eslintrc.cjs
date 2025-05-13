const importSortingRules = {
  'sort-imports': [
    'warn',
    {
      // sort-imports can't sort import lines so we'll use eslint-plugin-import instead
      ignoreDeclarationSort: true,
    },
  ],
  'import/order': [
    'warn',
    {
      groups: [
        'builtin', // built-in imports go first
        'external', // then external imports
        'internal', // then absolute imports
        ['sibling', 'parent'], // then relative imports (siblings and parents can go together)
        'index', // then index imports
        'unknown', // then everything else
      ],
      'newlines-between': 'always',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
};

const defaultRules = {
  '@typescript-eslint/no-unused-vars': [
    'warn',
    { argsIgnorePattern: '^_', ignoreRestSiblings: true },
  ],
  'react/jsx-sort-props': 'warn',
  'react/prop-types': 'off',
  ...importSortingRules,
};

module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/test/**/*', '**/*.test.*'],
      rules: {
        ...defaultRules,
        ...disableForTest,
      },
    },
    {
      files: ['src/api/**/*'],
      rules: {
        ...defaultRules,
        ...disableForTest,
        '@typescript-eslint/no-restricted-imports': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'react', 'react-refresh'],
  root: true,
  rules: defaultRules,
  settings: {
    react: {
      version: 'detect',
    },
  },
};
