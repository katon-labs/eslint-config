import pluginTS from '@typescript-eslint/eslint-plugin'
import parserTS from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_TSX, GLOB_VUE } from "../globs";
import type { TypedFlatConfigItem } from "../types";

export interface TypescriptOptionsFile {
  tsconfigPath?: string
  fileTypeAware?: string[]
}

export function typescript(options?: TypescriptOptionsFile): TypedFlatConfigItem[] {
  const files = [GLOB_TS, GLOB_TSX, GLOB_VUE]

  const fileTypeAware = options?.fileTypeAware ?? [GLOB_TS, GLOB_TSX, GLOB_VUE]
  const tsconfigPath = options?.tsconfigPath
    ? options.tsconfigPath
    : undefined
  const isTypeAware = !!tsconfigPath

  const typeAwareRules: TypedFlatConfigItem['rules'] = {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/strict-boolean-expressions': ['error', { allowNullableBoolean: true, allowNullableObject: true }]
  }

  function makeParser(typeAware: boolean, files: string[], ignores?: string[]): TypedFlatConfigItem {
    return {
      files,
      ...ignores ? { ignores } : {},
      languageOptions: {
        parser: parserTS,
        parserOptions: {
          extraFileExtensions: ['.vue'],
          sourceType: 'module',
          ...typeAware
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {},
        },
      },
      name: `katon-labs/typescript/${typeAware ? 'type-aware-parser' : 'parser'}`,
    }
  }

  return [
    {
      // Install the plugins without globs, so they can be configured separately.
      name: 'katon-labs/typescript/setup',
      plugins: {
        '@typescript-eslint': pluginTS as any,
      },
    },
    // assign type-aware parser for type-aware files and type-unaware parser for the rest
    ...isTypeAware
      ? [
          makeParser(false, files),
          makeParser(true, fileTypeAware),
        ]
      : [
          makeParser(false, files),
        ],
    {
      files,
      name: 'katon-labs/typescript/rules',
      rules: {
        ...pluginTS.configs['eslint-recommended'].overrides![0].rules!,
        ...pluginTS.configs.strict.rules!,
        'no-dupe-class-members': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: true, prefer: 'type-imports'}],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-duplicate-type-constituents': 'error'
      }
    },
    ...isTypeAware
      ? [{
          files: fileTypeAware,
          name: 'katon-labs/typescript/typeaware-rules',
          rules: {
            ...typeAwareRules
          }
        }] : []
  ]
}
