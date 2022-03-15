module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
            tsx: true
        }
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'jest',
        'sort-keys-fix'
    ],
    extends: [
        'airbnb-typescript',
        'prettier',
        'plugin:jest/recommended'
    ],
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true
    },
    settings: {
        'import/resolver': {
            typescript: {}
        }
    },
    rules: {
        'no-underscore-dangle': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-indent': 'off',
        'class-methods-use-this': 'warn',
        'sort-keys-fix/sort-keys-fix': 'error',
        'import/no-extraneous-dependencies': 'off',
        'import/extensions':'off'
    }
}