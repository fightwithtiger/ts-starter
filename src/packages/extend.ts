import type { CanvasRenderingContext2DPlus, PatternOps } from '../types'
import patternOps from './pattern'
import { createPatternOpsHandler } from './handler'

export function enhance(ctx: CanvasRenderingContext2D): CanvasRenderingContext2DPlus {
  for (const key in patternOps) {
    const fn = patternOps[key as keyof PatternOps]
    const collectionHandler = createPatternOpsHandler(fn)
    proxy(ctx, key, collectionHandler)
  }

  return ctx as CanvasRenderingContext2DPlus
}

function proxy(target: any, key: string, collectionHandler: PropertyDescriptor) {
  Object.defineProperty(target, key, collectionHandler)
}
