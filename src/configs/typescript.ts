import pluginTS from '@typescript-eslint/eslint-plugin'
import parserTS from '@typescript-eslint/parser'
import { GLOB_TS, GLOB_TSX, GLOB_VUE } from "../globs";
import type { TypedFlatConfigItem } from "../types";

export interface TypescriptOptionsFile {
  tsconfigPath?: string
  fileTypeAware?: string[]
}

const getRulesFromConfigs = (config: any) => {
  const array = Array.isArray(config) ? config : [config]
  const object = array.reduce((acc, item) => {
    return { ...acc, ...item.rules }
  }, {})
  return object
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
        ...getRulesFromConfigs(pluginTS.configs['flat/recommended']),
        // Type-aware rules
        ...(tsconfigPath
          ? getRulesFromConfigs(pluginTS.configs['flat/recommended-type-checked-only']) : {}),
        ...getRulesFromConfigs(pluginTS.configs['flat/strict']),
        ...pluginTS.configs['eslint-recommended'].overrides![0].rules!,
        ...pluginTS.configs.strict.rules!,

        // Include typescript eslint rules in *.vue files
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
        'constructor-super': 'off', // ts(2335) & ts(2377)
        'getter-return': 'off', // ts(2378)
        'no-const-assign': 'off', // ts(2588)
        'no-dupe-args': 'off', // ts(2300)
        'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
        'no-dupe-keys': 'off', // ts(1117)
        'no-func-assign': 'off', // ts(2539)
        'no-import-assign': 'off', // ts(2539) & ts(2540)
        'no-new-symbol': 'off', // ts(7009)
        'no-obj-calls': 'off', // ts(2349)
        'no-redeclare': 'off', // ts(2451)
        'no-setter-return': 'off', // ts(2408)
        'no-this-before-super': 'off', // ts(2376)
        'no-undef': 'off', // ts(2304)
        'no-unreachable': 'off', // ts(7027)
        'no-unsafe-negation': 'off', // ts(2365) & ts(2360) & ts(2358)
        'no-var': 'error', // ts transpiles let/const to var, so no need for vars any more
        'prefer-const': 'error', // ts provides better types with const
        'prefer-rest-params': 'error', // ts provides better types with rest args over arguments
        'prefer-spread': 'error', // ts transpiles spread to apply, so no need for manual apply
        'valid-typeof': 'off', // ts(2367)
        'no-unused-vars': 'off', // ts takes care of this

        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': ['error', {
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
          vars: 'all',
          varsIgnorePattern: '^_',
        }],
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: true, prefer: 'type-imports' }],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-duplicate-type-constituents': 'error',

      }
    },
  ]
}
