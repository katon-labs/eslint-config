import pluginVue from 'eslint-plugin-vue'
import parserVue from 'vue-eslint-parser'
import parserTS from '@typescript-eslint/parser'
import type { TypedFlatConfigItem } from "../types";
import { GLOB_VUE } from '../globs';

export function vue (): TypedFlatConfigItem[] {
  const files = [GLOB_VUE]
  const indent = 2

  return [
    {
      name: 'katon-labs/vue/setup',
      plugins: {
        'vue': pluginVue
      },
      // This allows Vue plugin to work with auto imports
      // https://github.com/vuejs/eslint-plugin-vue/pull/2422
      languageOptions: {
        globals: {
          computed: 'readonly',
          defineEmits: 'readonly',
          defineExpose: 'readonly',
          defineProps: 'readonly',
          onMounted: 'readonly',
          onUnmounted: 'readonly',
          reactive: 'readonly',
          ref: 'readonly',
          shallowReactive: 'readonly',
          shallowRef: 'readonly',
          toRef: 'readonly',
          toRefs: 'readonly',
          watch: 'readonly',
          watchEffect: 'readonly',
        },
      }
    },
    {
      files,
      name: 'katon-labs/vue/rules',
      languageOptions: {
        parser: parserVue,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          extraFileExtensions: ['.vue'],
          parser: parserTS,
          sourceType: 'module',
        },
      },
      processor: pluginVue.processors['.vue'],
      rules: {
        ...pluginVue.configs.base.rules as any,
        ...pluginVue.configs.essential.rules as any,
        ...pluginVue.configs['vue3-recommended'].rules as any,
        ...pluginVue.configs['vue3-strongly-recommended'].rules as any,
        ...pluginVue.configs['vue3-essential'].rules as any,
        'vue/block-order': ['error', {
          order: ['script', 'template', 'style'],
        }],
        'vue/component-name-in-template-casing': ['error', 'PascalCase'],
        'vue/component-options-name-casing': ['error', 'PascalCase'],
        'vue/custom-event-name-casing': ['error', 'camelCase'],
        'vue/define-macros-order': ['error', {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots'],
        }],
        'vue/dot-location': ['error', 'property'],
        'vue/dot-notation': ['error', { allowKeywords: true }],
        'vue/eqeqeq': ['error', 'smart'],
        'vue/html-indent': ['error', indent],
        'vue/html-quotes': ['error', 'double'],
        'vue/max-attributes-per-line': ['error', { singleline: 2 }],
        'vue/multi-word-component-names': 'off',
        'vue/no-dupe-keys': 'error',
        'vue/no-empty-pattern': 'error',
        'vue/no-irregular-whitespace': 'error',
        'vue/no-loss-of-precision': 'error',
        'vue/no-restricted-syntax': [
          'error',
          'DebuggerStatement',
          'LabeledStatement',
          'WithStatement',
        ],
        'vue/no-restricted-v-bind': ['error', '/^v-/'],
        'vue/no-sparse-arrays': 'error',
        'vue/no-unused-refs': 'error',
        'vue/no-useless-v-bind': 'error',
        'vue/no-v-html': 'off',
        'vue/object-shorthand': [
          'error',
          'always',
          {
            avoidQuotes: true,
            ignoreConstructors: false,
          },
        ],
        'vue/prefer-separate-static-class': 'error',
        'vue/prefer-template': 'error',
        'vue/prop-name-casing': ['error', 'camelCase'],
        'vue/no-root-v-if': 'error',
        'vue/no-multiple-template-root': 'warn',
        // this is deprecated
        'vue/component-tags-order': 'off',
        // stylistic
        'vue/array-bracket-spacing': ['error', 'never'],
        'vue/arrow-spacing': ['error', { after: true, before: true }],
        'vue/block-spacing': ['error', 'always'],
        'vue/block-tag-newline': [
          'error',
          {
            singleline: 'always',
            multiline: 'always',
          },
        ],
        'vue/brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'vue/comma-dangle': ['error', 'always-multiline'],
        'vue/comma-spacing': ['error', { after: true, before: false }],
        'vue/comma-style': ['error', 'last'],
        'vue/html-comment-content-spacing': ['error', 'always', {
          exceptions: ['-'],
        }],
        'vue/key-spacing': [
          'error',
          {
            align: {
              beforeColon: false,
              afterColon: true,
              on: 'value',
            },
          },
        ],
        'vue/keyword-spacing': ['error', { after: true, before: true }],
        'vue/object-curly-spacing': ['error', 'always'],
        'vue/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
        'vue/operator-linebreak': ['error', 'before'],
        'vue/padding-line-between-blocks': ['error', 'always'],
        'vue/quote-props': ['error', 'consistent-as-needed'],
        'vue/space-in-parens': ['error', 'never'],
        'vue/template-curly-spacing': 'error',
      }
    }
  ]
}
