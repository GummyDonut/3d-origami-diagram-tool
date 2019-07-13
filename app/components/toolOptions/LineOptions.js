import TriangleOptions from './TriangleOptions.js'
class LineOptions extends TriangleOptions {
  /**
   * Constructor
   * @param {PopoverCursor} popoverMove - WE use to update values
   */
  constructor (popoverMove) {
    super({
      'popoverMove': popoverMove,
      'optionsTitle': 'Line Options'
    })
  }
}

export default LineOptions
