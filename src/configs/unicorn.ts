import pluginUnicorn from 'eslint-plugin-unicorn'
import type { TypedFlatConfigItem } from "../types";

export function unicorn(): TypedFlatConfigItem[] {
  return [
    {
      name: 'katon-labs/unicorn/rules',
      plugins: {
        unicorn: pluginUnicorn
      },
      rules: {
        'unicorn/consistent-empty-array-spread': 'error',
        'unicorn/error-message': 'error',
        'unicorn/escape-case': 'error',
        'unicorn/new-for-builtins': 'error',
        'unicorn/no-instanceof-array': 'error',
        'unicorn/no-new-array': 'error',
        'unicorn/prefer-includes': 'error',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/prefer-number-properties': 'error',
        'unicorn/prefer-string-starts-ends-with': 'error',
        'unicorn/prefer-type-error': 'error',
        'unicorn/throw-new-error': 'error'
      }
    }
  ]
}
