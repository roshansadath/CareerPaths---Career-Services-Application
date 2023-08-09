module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
      'indent': ['error', 2],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'import/order': ['error', {
        'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }]
    }
  };
  


//  Indentation Rule:

// 'indent': ['error', 2]
// This rule enforces consistent indentation of code blocks. It's set to an error level (meaning violations will be reported), and it enforces an indentation of 2 spaces.


// Explicit Function Return Type Rule:

// '@typescript-eslint/explicit-function-return-type': 'off'
// This rule is turned off. It would normally enforce explicit return types on functions in TypeScript. However, in this configuration, it's disabled to avoid requiring explicit return types.


// Unused Variables Rule:

// '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }]
// This rule reports unused variables in TypeScript code. It's set to an error level. The configuration allows variables whose names start with an underscore (_) to be ignored when checking for unused variables.


// Import Order Rule:

// 'import/order': ['error', { ... }]
// This rule enforces a consistent order for import statements. The specific configuration provided enforces the order of imports based on different groups (builtin, external, internal, parent/sibling/index) and requires newlines between groups.