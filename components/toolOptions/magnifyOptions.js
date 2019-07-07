import ToolOptions from '../toolOptions.js'

const toolSelection = '#scale_amount'
class MagnifyToolOptions extends ToolOptions {
  constructor () {
    super({ html: 'magnifyOptions.html' })
    this.factor = 5 // number between 1 and 100
  }

  /**
   * Run on start and add HTML to tool box options
   */
  addToToolOptionBox () {
    super.addToToolOptionBox().then(() => {
      this.optionsListeners()

      // add initial value
      this.factor = 5
      $(toolSelection).val(this.factor)
    })
  }

  /**
   * Event listeners for the items within options box
   */
  optionsListeners () {
    // alias
    var self = this

    $(toolSelection).on('change', function (event) {
      self.factor = parseInt(this.value)
    })
  }
}

export default MagnifyToolOptions
