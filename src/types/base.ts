import type { PatternOps } from './patternTypes'
import type { TextOps } from './textTypes'

export type CanvasRenderingContext2DPlus = CanvasRenderingContext2D & {
  [key in keyof PatternOps]: PatternOps[key]
} & {
  [key in keyof TextOps]: TextOps[key]
}
