import ToolOptions from '../toolOptions.js'
class singleTriangleOptions extends ToolOptions {
  constructor () {
    super('singleTriangleOptions.html')
  }

  /**
   * Run on start and add HTML to tool box options
   */
  addToToolOptionBox () {
    super.addToToolOptionBox().then(() => {
      this.optionsListeners()

      // add initial value
      this.strokeColor = 'blue'
    })
  }

  /**
   * Event listeners for items that occur within the tool options box
   */
  optionsListeners () {
    // alias
    let self = this

    $('#triangleStrokeColorPicker').ColorPicker({
      color: self.strokeColor,
      onBeforeShow: function () {
        $(this).ColorPickerSetColor(self.strokeColor)
      },
      onSubmit: function (hsb, hex, rgb, el) {
        $('#triangleStrokeColorPicker div').css('backgroundColor', '#' + hex)
        self.strokeColor = '#' + hex
        $(el).ColorPickerHide()
      }
    })

    // TODO indicate or add shortcut that helps show which button to press to update color
  }
}

export default singleTriangleOptions
