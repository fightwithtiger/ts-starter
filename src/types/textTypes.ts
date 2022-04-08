import type textOps from '../packages/text'

export type TextOps = typeof textOps

export type TextMode = 'fill' | 'stroke'

export interface TextConfig {
  mode?: TextMode
  maxWidth?: number
}
