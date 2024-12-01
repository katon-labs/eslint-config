import pluginPerfectionist from 'eslint-plugin-perfectionist'
import type { TypedFlatConfigItem } from '../types';

export function perfectionist(): TypedFlatConfigItem[] {
  return [
    {
      name: 'katon-labs/perfectionist/rules',
      plugins: {
        'perfectionist': pluginPerfectionist
      },
      rules: {
        'perfectionist/sort-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-imports': ['error', {
          groups: [
            'type',
            ['parent-type', 'sibling-type', 'index-type'],

            'builtin',
            'external',
            ['internal', 'internal-type'],
            ['parent', 'sibling', 'index'],
            'side-effect',
            'object',
            'unknown',
          ],
          newlinesBetween: 'ignore',
          order: 'asc',
          type: 'natural',
        }],
        'perfectionist/sort-named-exports': ['error', { order: 'asc', type: 'natural' }],
        'perfectionist/sort-named-imports': ['error', { order: 'asc', type: 'natural' }],
      }
    }
  ]
}
