import { GLOB_EXCLUDE } from "../globs";
import type { TypedFlatConfigItem } from "../types";

export function ignores(): TypedFlatConfigItem[] {
  return [
    {
      name: 'katon-labs/ignores',
      ignores: [
        ...GLOB_EXCLUDE
      ]
    }
  ]
}
