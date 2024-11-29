import fs from 'node:fs/promises'
import pluginTS from '@typescript-eslint/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import pluginImports from 'eslint-plugin-import-x'
import pluginUnicorn from 'eslint-plugin-unicorn'
import { pluginsToRulesDTS } from 'eslint-typegen/core'

const dts = await pluginsToRulesDTS({
  '@typescript-eslint': pluginTS,
  'vue': pluginVue,
  'import': pluginImports,
  'unicorn': pluginUnicorn,
})

await fs.writeFile('src/typegen.d.ts', dts)
