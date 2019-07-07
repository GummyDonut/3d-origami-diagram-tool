import ToolOptions from '../toolOptions.js'
class EraserOptions extends ToolOptions {
  constructor (popoverMove) {
    super({ html: 'eraserOptions.html' })
    this.toolSize = 1 // number between 1 and 100
    this.popoverMove = popoverMove
  }

  /**
   * Run on start and add HTML to tool box options
   */
  addToToolOptionBox () {
    super.addToToolOptionBox().then(() => {
      this.optionsListeners()

      $('#eraserToolSize').val(this.toolSize)
    })
  }

  /**
   * Event listener for options
   */
  optionsListeners () {
    // alias
    var self = this

    $('#eraserToolSize').on('change', function (event) {
      let pixelSize = parseInt(this.value)

      // validate, possibly set a max
      if (pixelSize < 1) {
        pixelSize = 1
        $(this).val(pixelSize)
      }

      // update cursor
      self.toolSize = pixelSize
      self.popoverMove.cursorSize = self.toolSize
    })
  }
}
export default EraserOptions
