import type { CanvasRenderingContext2DPlus, Point } from '../types'

export function mergeOptions<T>(ctx: CanvasRenderingContext2DPlus, options: T) {
  for (const key in options)
    ctx[key] = options[key]
}

export function connectPoints(ctx: CanvasRenderingContext2DPlus, points: Point[]) {
  for (let i = 0; i < points.length - 1; i++)
    connect(ctx, points[i], points[i + 1])
}

export function connect(ctx: CanvasRenderingContext2DPlus, p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y)
  ctx.stroke()
  ctx.closePath()
}
