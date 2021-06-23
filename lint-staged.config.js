module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write', () => 'tsc --project tsconfig.json --noEmit'],
}
