import fs from 'node:fs/promises'
import pluginTS from '@typescript-eslint/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import pluginImports from 'eslint-plugin-import-x'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginPerfectionist from 'eslint-plugin-perfectionist'
import pluginNode from 'eslint-plugin-n'
import pluginStylistic from '@stylistic/eslint-plugin'
import { pluginsToRulesDTS } from 'eslint-typegen/core'

const dts = await pluginsToRulesDTS({
  '@typescript-eslint': pluginTS,
  'vue': pluginVue,
  'import': pluginImports,
  'unicorn': pluginUnicorn,
  'perfectionist': pluginPerfectionist,
  'node': pluginNode,
  '@stylistic': pluginStylistic
})

await fs.writeFile('src/typegen.d.ts', dts)
