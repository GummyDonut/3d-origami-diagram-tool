
import customShape from './customShape.js'
class Triangle extends customShape {
  /**
   * Create a triangle on the board
   * @param {Rectangle} rectangle - rectangle object representing the sqaure grid
   * @param {Object} options - represents the options we can add to this triangle
   * {
   *   strokeColor: <String representing the color>
   *
   * }
   */
  constructor (rectangle, options) {
    super()
    let path = new paper.Path()

    path.add(new paper.Point(rectangle.x + (rectangle.width / 2), rectangle.y)) // top
    path.add(new paper.Point(rectangle.x, rectangle.y + rectangle.height)) // bottom left
    path.add(new paper.Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height)) // bottom right
    path.closed = true

    this.path = path
    this.path.fillColor = 'white'
    this.path.strokeColor = (options.strokeColor) ? options.strokeColor : 'blue'
    this.path.selected = true
    this.path.fullySelected = false
  }
}

export default Triangle
