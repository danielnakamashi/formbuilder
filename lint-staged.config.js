module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write', () => 'lerna run lint:ts'],
}
