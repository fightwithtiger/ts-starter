import type { PatternOps } from './patternTypes'

export type CanvasRenderingContext2DPlus = CanvasRenderingContext2D & {
  [key in keyof PatternOps]: PatternOps[key]
} & {
  _patternOps: PatternOps
}
