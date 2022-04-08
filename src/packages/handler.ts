
export function createPatternOpsHandler(value: any) {
  return {
    get() {
      return value
    },
    set() {
      throw new Error('not configurable')
    },
  }
}
