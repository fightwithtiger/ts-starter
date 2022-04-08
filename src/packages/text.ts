import type { CanvasRenderingContext2DPlus, Options, Point, TextConfig } from '../types'
import { drawLongText, drawWords, mergeOptions } from '../share'

function drawText(this: CanvasRenderingContext2DPlus, content: string | number, p: Point, options?: Options, config?: TextConfig) {
  content = String(content)

  this.save()
  options && mergeOptions(this, options)
  if (!config?.maxWidth)
    drawLongText(this, content, p, config?.mode)
  else
    drawWords(this, content, p, config)
  this.restore()
}

const textOps = {
  drawText,
}

export default textOps
