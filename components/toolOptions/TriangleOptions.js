import ToolOptions from '../toolOptions.js'
class TriangleOptions extends ToolOptions {
  /**
   * Constructor
   * @param {Object} options options for enabling and disabling certain options
   *  popoverMove - object representing box on cursor for triangle tool
   */
  constructor (options) {
    if (!options) {
      console.error('No options defined, for triangleOptions. Developer please fix')
    }

    super('triangleOptions.html')
    // add initial value
    this.strokeColor = '#0000ff'
    this.fillColor = '#0000ff'
    this.fill = false
    this.toolSize = 1

    if (options.popoverMove) {
      this.popoverMove = options.popoverMove
    }
  }

  /**
   * Run on start and add HTML to tool box options
   */
  addToToolOptionBox () {
    // alias
    var self = this

    super.addToToolOptionBox().then(() => {
      // hide toolsize of popoverMove is not used
      if (self.popoverMove === undefined) {
        $('#triangleToolSize').closest('tr').hide()
      }

      this.optionsListeners()
      this.initValue()
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

    // Indicate the size of the popover box, only available if the options is allowed
    if (self.popoverMove !== undefined) {
      $('#triangleToolSize').on('change', function (event) {
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

  /**
   * Instantiate with initial values
   */
  initValue () {
    $('#triangleFill').prop('checked', this.fill)
    $('#triangleToolSize').val(this.toolSize)
  }
}

export default TriangleOptions
