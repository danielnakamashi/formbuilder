module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  'packages/core/**/*.ts': () => 'yarn workspace @form-build/core lint:fix',
}
