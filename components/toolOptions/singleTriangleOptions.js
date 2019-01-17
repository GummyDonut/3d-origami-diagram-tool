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
      this.strokeColor = '#0000ff'
      this.fillColor = '#0000ff'
      this.fill = false
    })
  }

  /**
   * Event listeners for items that occur within the tool options box
   */
  optionsListeners () {
    // alias
    let self = this

    // stroke color
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
    // https://www.pixilart.com/draw replace button with an actual button

    // Checkbox for if we should have a fill color
    $('#triangleFill').on('change', function () {
      if (this.checked) {
        self.fill = true
        $('#fillColorRow').show()
      } else {
        self.fill = false
        $('#fillColorRow').hide()
      }
    })

    // update fill color
    $('#triangleFillColorPicker').ColorPicker({
      color: self.fillColor,
      onBeforeShow: function () {
        $(this).ColorPickerSetColor(self.fillColor)
      },
      onSubmit: function (hsb, hex, rgb, el) {
        $('#triangleFillColorPicker div').css('backgroundColor', '#' + hex)
        self.fillColor = '#' + hex
        $(el).ColorPickerHide()
      }
    })
  }
}

export default singleTriangleOptions