import Triangle from './triangle.js'
class BasicTriangle extends Triangle {
  /**
   * Create the path object, draws the triangle
   * @param {Rectangle path object} rectangle
   * @param {The triangle options} options
   */
  createPathObject (rectangle, options) {
    let path = new paper.Path()

    // add t
    path.add(new paper.Point(rectangle.x + (rectangle.width / 2), rectangle.y + (rectangle.height / 8))) // top
    path.add(new paper.Point(rectangle.x + (rectangle.width / 8), rectangle.y + rectangle.height)) // bottom left
    path.add(new paper.Point(rectangle.x + rectangle.width - (rectangle.width / 8), rectangle.y + rectangle.height)) // bottom right
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

export default BasicTriangle
