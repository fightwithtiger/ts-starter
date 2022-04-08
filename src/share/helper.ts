import type { CanvasRenderingContext2DPlus, Point, TextConfig, TextMode } from '../types'

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

export function drawLongText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point, mode?: TextMode) {
  if (mode === 'stroke')
    drawStrokeText(ctx, content, p)
  else
    drawFillText(ctx, content, p)
}

export function drawFillText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point) {
  ctx.fillText(content, p.x, p.y)
}

export function drawStrokeText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point) {
  ctx.strokeText(content, p.x, p.y)
}

export function drawWords(ctx: CanvasRenderingContext2DPlus, words: string, p: Point, config: TextConfig) {
  let left = p.x
  let top = p.y
  const maxWidth = config.maxWidth ?? Infinity
  const mode = config.mode ?? 'fill'

  for (let i = 0; i < words.length; i++) {
    const metrics = ctx.measureText(words[i])
    const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent
    // 所有字在这个字体下的高度
    // const actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    // 当前文本字符串在这个字体下用的实际高度

    const point = {
      x: left,
      y: top,
    }
    left += metrics.width
    if (left - p.x >= maxWidth) {
      // 换行
      left = p.x
      top += fontHeight
    }
    drawWord(ctx, words[i], point, mode)
  }
}

export function drawWord(ctx: CanvasRenderingContext2DPlus, word: string, p: Point, mode?: TextMode) {
  if (mode === 'stroke')
    ctx.strokeText(word, p.x, p.y)
  else
    ctx.fillText(word, p.x, p.y)
}
