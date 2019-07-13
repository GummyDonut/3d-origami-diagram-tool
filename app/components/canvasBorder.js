
/**
 * Canvas border
 */
export default {
  rectangle: null,
  path: null,
  /**
   *
   * @param {Number} startX - Starting x coordinate top left corner
   * @param {Number} startY- Starting y coordinate top left corner
   * @param {Number} width - width of the canvas border
   * @param {Number} height- width of the canvas border
   */
  init (startX, startY, width, height) {
    this.rectangle = new paper.Rectangle(startX, startY, width, height)
    this.path = new paper.Path.Rectangle(this.rectangle)
    this.path.strokeColor = 'black'
    this.path.opacity = 0.7
  }
}
