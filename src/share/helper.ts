import type { CanvasRenderingContext2DPlus, ImageOptions, ImageSourceType, Point, TextConfig, TextItem, TextMode } from '../types'

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

export function drawTextItem(ctx: CanvasRenderingContext2DPlus, text: TextItem, originalPoint: Point, config?: TextConfig): Point {
  const { content, point, options } = text
  let p = {
    x: 0,
    y: 0,
  }

  ctx.save()
  options && mergeOptions(ctx, options)
  if (!config?.maxWidth)
    p = drawLongText(ctx, String(content), point, config?.mode)
  else
    p = drawWords(ctx, String(content), point, originalPoint, config)
  ctx.restore()

  return p
}

export function drawLongText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point, mode?: TextMode) {
  const metrics = ctx.measureText(content)
  if (mode === 'stroke')
    drawStrokeText(ctx, content, p)
  else
    drawFillText(ctx, content, p)
  return {
    x: p.x + metrics.width,
    y: p.y,
  }
}

export function drawFillText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point) {
  ctx.fillText(content, p.x, p.y)
}

export function drawStrokeText(ctx: CanvasRenderingContext2DPlus, content: string, p: Point) {
  ctx.strokeText(content, p.x, p.y)
}

export function drawWords(ctx: CanvasRenderingContext2DPlus, words: string, p: Point, originalPoint: Point, config: TextConfig): Point {
  let left = p.x
  let top = p.y
  const originalX = originalPoint.x

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
    if (left - originalX >= maxWidth) {
      // 换行
      left = originalX
      top += config.lineHeight ?? fontHeight
    }
    drawWord(ctx, words[i], point, mode)
  }
  return {
    x: left,
    y: top,
  }
}

export function drawWord(ctx: CanvasRenderingContext2DPlus, word: string, p: Point, mode?: TextMode) {
  if (mode === 'stroke')
    ctx.strokeText(word, p.x, p.y)
  else
    ctx.fillText(word, p.x, p.y)
}

export function getTargetImg(options: ImageOptions): Promise<ImageSourceType | null> {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async(resolve, reject) => {
    if (options.url) {
      const url = typeof options.url === 'string' ? options.url : ''
      const img = await getImg(url).catch(e => console.error(e)) as ImageSourceType
      resolve(img)
    }
    else if (options.source) {
      resolve(options.source)
    }

    // eslint-disable-next-line prefer-promise-reject-errors
    reject('fail to load resource!')
  })
}

export function getImg(url: string): Promise<ImageSourceType | unknown> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url

    img.onload = function() {
      resolve(img)
    }
    img.onerror = function() {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('fail to resolve image!')
    }
  })
}
