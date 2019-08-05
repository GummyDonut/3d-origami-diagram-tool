
/**
 * Custom class for triangle
 * represents the basic traingle
 */
class Triangle {
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

  createPathObject (rectangle, options) {
    console.log('createPathObject, running abstract class version. Please override this function')
  }
}

export default Triangle
