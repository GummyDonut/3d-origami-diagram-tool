import Triangle from './triangles/triangle.js'
/**
 * Function for creating the appropriate triangles based on the triangleType
 * set in triangleOptions
 */
export default {

  /**
   *
   * @param {Object} options determines which triangle to draw and how to draw it
   */
  drawTriangle (rectangle, options) {
    switch (options.triangleType) {
      case 'basic':
        return new Triangle(rectangle, {
          'strokeColor': options.strokeColor,
          'fillColor': options.fillColor,
          'fill': options.fill,
          'triangleType': options.triangleType
        })
    }
  }
}
