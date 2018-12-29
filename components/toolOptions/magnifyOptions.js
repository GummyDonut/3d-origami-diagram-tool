import ToolOptions from '../toolOptions.js'

let htmlContent = [
  '<h4>Magnify Options</h4>',
  '<div id="magnifySlider"></div>'
]

class MagnifyToolOptions extends ToolOptions {
  /**
   * @param {Array of Strings} html - contains html elements
   */
  constructor (html) {
    super()
    this.html = htmlContent
  }

  /**
   * Run on start and add HTML to tool box options
   */
  addToToolOptionBox () {
    super.addToToolOptionBox()

    this.optionsListeners()
  }

  /**
   * Event listeners for the items within options box
   */
  optionsListeners () {
    $('#magnifySlider').slider()
  }
}

export default MagnifyToolOptions
