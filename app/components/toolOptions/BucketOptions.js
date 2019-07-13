
import TriangleOptions from './TriangleOptions.js'
class BucketOptions extends TriangleOptions {
  /**
   * Constructor
   */
  constructor () {
    // uses the same settings as triangle options
    // except no popovermove as this is a bucket
    super({
      'optionsTitle': 'Bucket Options'
    })
  }
}

export default BucketOptions
