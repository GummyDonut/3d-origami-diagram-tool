import BasicTriangle from './triangles/BasicTriangle.js'
import UpsideDownTriangle from './triangles/UpsideDownTriangle.js'
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
        return new BasicTriangle(rectangle, {
          'strokeColor': options.strokeColor,
          'fillColor': options.fillColor,
          'fill': options.fill,
          'triangleType': options.triangleType
        })
      case 'upSideDown':
        return new UpsideDownTriangle(rectangle, {
          'strokeColor': options.strokeColor,
          'fillColor': options.fillColor,
          'fill': options.fill,
          'triangleType': options.triangleType
        })
    }
  }
}
