
import CustomShape from '../customShape.js'
/**
 * Custom class for triangle
 * represents the basic traingle
 */
class Triangle extends CustomShape {
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
    this.path = this.createPathObject(rectangle, options)

    // store options
    this.options = options
  }

  /**
   * Function to check if triangle if similar to other
   * @param {Object} options tooloptions contains the options we will comparing
   */
  matches (options) {
    // if there is fill add
    let fillColor = (options.fill) ? options.fillColor : null

    return this.path.matches({
      'strokeColor': options.strokeColor,
      'fillColor': fillColor
    }) && options.triangleType === this.options.triangleType
  }

  /**
   * Create the path object
   * this class will be overwritten by other triangle classes.
   * Currently triangles are generated from triangleFactory. To allow us to generate different kind of triangles.
   * @param {Rectangle path object} rectangle
   * @param {The triangle options} options
   */
  createPathObject (rectangle, options) {
    let path = new paper.Path()
    path.add(new paper.Point(rectangle.x + (rectangle.width / 2), rectangle.y)) // top
    path.add(new paper.Point(rectangle.x, rectangle.y + rectangle.height)) // bottom left
    path.add(new paper.Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height)) // bottom right
    path.closed = true

    // If there is a fill specified
    if (options.fill) {
      path.fillColor = (options.fillColor) ? options.fillColor : 'blue'
    }

    path.strokeColor = (options.strokeColor) ? options.strokeColor : 'blue'
    path.selected = true
    path.fullySelected = false

    return path
  }
}

export default Triangle
