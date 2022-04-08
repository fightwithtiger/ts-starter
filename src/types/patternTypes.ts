import type patternOps from '../packages/pattern'

export interface Point {
  x: number
  y: number
}

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export type PatternOps = typeof patternOps

export interface BaseOptions extends CanvasFillStrokeStyles, CanvasPathDrawingStyles, CanvasShadowStyles, CanvasTextDrawingStyles {

}

export type Options = Partial<BaseOptions>
