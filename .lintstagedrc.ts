import type { Config } from 'lint-staged'

const config: Config = {
  '**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '**/*.{json,css,scss,md}': ['prettier --write'],
}

export default config
