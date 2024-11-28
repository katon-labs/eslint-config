import pluginImports from 'eslint-plugin-import-x'
import type { TypedFlatConfigItem } from "../types";

export function imports (): TypedFlatConfigItem[] {
  return [
    {
      name: 'katon-labs/imports/rules',
      plugins: {
        import: pluginImports
      },
      rules: {
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        // stylistic
        'import/newline-after-import': ['error', { count: 1 }],
      }
    }
  ]
}
