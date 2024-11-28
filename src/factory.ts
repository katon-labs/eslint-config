import { FlatConfigComposer, type Awaitable } from 'eslint-flat-config-utils'
import type { TypedFlatConfigItem } from './types'

import { imports, typescript, vue, type TypescriptOptionsFile } from './configs'

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

  let composer = new FlatConfigComposer()

  composer
    .append(...configs)
  
  return composer
}
