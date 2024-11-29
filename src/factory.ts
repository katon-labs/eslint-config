import { FlatConfigComposer, type Awaitable } from 'eslint-flat-config-utils'
import type { TypedFlatConfigItem } from './types'

import { imports, node, perfectionist, typescript, unicorn, vue, type TypescriptOptionsFile } from './configs'

export interface FactoryOptions {
  ts?: TypescriptOptionsFile
}

export function katonlabs(options: FactoryOptions = {}): FlatConfigComposer {
  const { ts } = options
  const configs: Awaitable<TypedFlatConfigItem[]>[] = []

  // typescript config
  configs.push(typescript(ts))
  // vue config
  configs.push(vue())
  // import config
  configs.push(imports())
  // unicorn config
  configs.push(unicorn())
  // perfectionist
  configs.push(perfectionist())
  // node
  configs.push(node())

  let composer = new FlatConfigComposer()

  composer
    .append(...configs)
  
  return composer
}
