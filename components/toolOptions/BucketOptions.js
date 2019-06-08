// import ToolOptions from '../toolOptions.js'
import TriangleOptions from './TriangleOptions.js'
class BucketOptions extends TriangleOptions {
  /**
   * Constructor
   */
  constructor () {
    // uses the same settings as triangle options
    // except no popovermove as this is a bucket
    super({})
    // add initial value
    this.strokeColor = '#0000ff'
    this.fillColor = '#0000ff'
    this.fill = false
    this.toolSize = 1
  }
}

export default BucketOptions
