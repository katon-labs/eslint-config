import pluginStylistic from '@stylistic/eslint-plugin'
import type { StylisticConfig, TypedFlatConfigItem } from "../types";

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export function stylistic(): TypedFlatConfigItem[] {
  const {
    indent,
    jsx,
    quotes,
    semi
  } = StylisticConfigDefaults

    const config = pluginStylistic.configs.customize({
      indent,
      jsx,
      quotes,
      semi
    })

  return [
    {
      name: 'katon-labs/stylistic/rules',
      plugins: {
        '@stylistic': pluginStylistic
      },
      rules: {
        ...config.rules,
      }
    }
  ]
}
