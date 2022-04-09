import type { CanvasRenderingContext2DPlus } from '../types'
import patternOps from './pattern'
import textOps from './text'
import imageOps from './image'
import { createPatternOpsHandler } from './handler'

export function enhance(ctx: CanvasRenderingContext2D): CanvasRenderingContext2DPlus {
  const operations = { ...patternOps, ...textOps, ...imageOps }
  for (const key in operations) {
    const fn = operations[key as keyof typeof operations]
    const collectionHandler = createPatternOpsHandler(fn)
    proxy(ctx, key, collectionHandler)
  }

  return ctx as CanvasRenderingContext2DPlus
}

function proxy(target: any, key: string, collectionHandler: PropertyDescriptor) {
  Object.defineProperty(target, key, collectionHandler)
}
