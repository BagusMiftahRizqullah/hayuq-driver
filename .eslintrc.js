module.exports = {
  root: true,
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react-native'],
  rules: {
    'max-lines': ['warn', {max: 500, skipBlankLines: true, skipComments: true}],
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': ['error', 'lodash'],
    'react/prop-types': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {exceptAfterSingleLine: true},
    ],
    'react-native/no-inline-styles': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          markers: ['#region', '#endregion'],
        },
      },
    ],
    // Not needed in TypeScript
    'react/no-unused-prop-types': 'off',
  },
  globals: {
    describe: true,
    beforeAll: true,
    it: true,
    expect: true,
    jest: true,
    __DEV__: true,
  },
  ignorePatterns: ['*.entitlements'],
};
