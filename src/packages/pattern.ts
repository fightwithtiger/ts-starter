import type { CanvasRenderingContext2DPlus, Options, Point, Rectangle } from '../types'
import { connect, connectPoints, mergeOptions } from '../share'

function drawLine(this: CanvasRenderingContext2DPlus, p1: Point, p2: Point, options?: Options) {
  this.save()
  options && mergeOptions<Options>(this, options)

  connect(this, p1, p2)
  this.restore()
}

function drawLines(this: CanvasRenderingContext2DPlus, points: Point[], options?: Options) {
  this.save()
  options && mergeOptions<Options>(this, options)

  connectPoints(this, points)
  this.restore()
}

function drawFillRect(this: CanvasRenderingContext2DPlus, rect: Rectangle, options?: Options) {
  const { x, y, width, height } = rect
  this.save()
  options && mergeOptions(this, options)
  this.fillRect(x, y, width, height)
  this.restore()
}

function drawStrokeRect(this: CanvasRenderingContext2DPlus, rect: Rectangle, options?: Options) {
  const { x, y, width, height } = rect
  this.save()
  options && mergeOptions(this, options)
  this.strokeRect(x, y, width, height)
  this.restore()
}

const patternOps = {
  drawLine,
  drawLines,
  drawFillRect,
  drawStrokeRect,
}

export default patternOps
