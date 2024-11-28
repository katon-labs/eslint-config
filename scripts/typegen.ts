import fs from 'node:fs/promises'
import pluginTS from '@typescript-eslint/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import pluginImports from 'eslint-plugin-import-x'
import { pluginsToRulesDTS } from 'eslint-typegen/core'

const dts = await pluginsToRulesDTS({
  '@typescript-eslint': pluginTS,
  'vue': pluginVue,
  'import': pluginImports
})

await fs.writeFile('src/typegen.d.ts', dts)
