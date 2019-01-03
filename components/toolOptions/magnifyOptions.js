import ToolOptions from '../toolOptions.js'

class MagnifyToolOptions extends ToolOptions {
  /**
   * @param {Array of Strings} html - contains html elements
   */
  constructor (html) {
    super()
    this.html = 'magnifyOptions.html'
  }

  /**
   * Run on start and add HTML to tool box options
   */
  addToToolOptionBox () {
    super.addToToolOptionBox().then(() => {
      this.optionsListeners()
    })
  }

  /**
   * Event listeners for the items within options box
   */
  optionsListeners () {
    $('#scale_amount').on('change', () => {
      console.log('scale change')
    })
  }
}

export default MagnifyToolOptions
