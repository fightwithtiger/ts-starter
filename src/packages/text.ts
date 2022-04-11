import type { CanvasRenderingContext2DPlus, TextConfig, TextItem } from '../types'
import { drawTextItem } from '../share'

function drawText(this: CanvasRenderingContext2DPlus, text: TextItem | TextItem[], config?: TextConfig) {
  text = JSON.parse(JSON.stringify(text))

  if (Array.isArray(text)) {
    let prePoint = text[0].point ?? { x: 0, y: 0 }
    text.forEach((item) => {
      item.point = prePoint
      prePoint = drawTextItem(this, item, (text as TextItem[])[0].point, config)
    })
  }
  else {
    drawTextItem(this, text, text.point, config)
  }
}

const textOps = {
  drawText,
}

export default textOps
