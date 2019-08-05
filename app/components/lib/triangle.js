
import CustomShape from './customShape.js'
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
    let path = new paper.Path()

    // based on the options draw that type of triangle
    if (!options.triangleType) {
      options.triangleType = 'basic'
    }

    if (options.triangleType === 'basic') {
      path.add(new paper.Point(rectangle.x + (rectangle.width / 2), rectangle.y)) // top
      path.add(new paper.Point(rectangle.x, rectangle.y + rectangle.height)) // bottom left
      path.add(new paper.Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height)) // bottom right
      path.closed = true
    } else {
      // option does not exist
      console.log('Error triangle option does not exist at the moment')
    }

    this.path = path

    // If there is a fill specified
    if (options.fill) {
      this.path.fillColor = (options.fillColor) ? options.fillColor : 'blue'
    }

    this.path.strokeColor = (options.strokeColor) ? options.strokeColor : 'blue'
    this.path.selected = true
    this.path.fullySelected = false

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
}

export default Triangle
