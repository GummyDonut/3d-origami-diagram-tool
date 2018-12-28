import Tool from '../tool.js'

class MagnifyTool extends Tool {
  constructor () {
    super()
    this['tool-type'] = 'magnify'
    this.data = {
      plusActive: false,
      minusActive: false
    }
  }

  /**
  * Initialize the tools listeners
  */
  init () {
    // Add event-listener for tools
    this.toolListeners()

    // Plus icon for magnify in
    $('#magnify-plus-tool').on('click', (event) => {
      this.deActivateTool()
      if (!this.data.plusActive) {
        $('#magnify-plus-tool').addClass('pure-button-active')
        super.changeToolIcon('cursor-magnify-plus')
        this.tool.activate()

        // bind box to cursor
        $(document).on('mousemove', this.popover)

        // shift key update icon
        $(document).on('keydown', { type: 'plus' }, this.holdShift)
        $(document).on('keyup', { type: 'plus' }, this.releaseShift)

        $('#popover').show()
        // indicate that the plus tool is now active
        this.data.plusActive = true
      } else {
        super.removeToolIcon()
      }
    })

    // Minus icon for zooming out
    $('#magnify-minus-tool').on('click', (event) => {
      this.deActivateTool()
      if (!this.data.minusActive) {
        // reset tool to all unactive
        $('#magnify-minus-tool').addClass('pure-button-active')
        super.changeToolIcon('cursor-magnify-minus')

        // reactive tool
        this.tool.activate()

        // bind box to cursor
        $(document).on('mousemove', this.popover)

        // shift key update icon
        $(document).on('keydown', { type: 'minus' }, this.holdShift)
        $(document).on('keyup', { type: 'minus' }, this.releaseShift)

        $('#popover').show()
        // indicate that the minus tool is now active
        this.data.minusActive = true
      } else {
        super.removeToolIcon()
      }
    })
  }

  /**
   * Reset all values for the tool
   */
  deActivateTool () {
    $('#magnify-plus-tool').removeClass('pure-button-active')
    $('#magnify-minus-tool').removeClass('pure-button-active')

    // remove box from cursor and additional event-listeners
    $(document).off('mousemove', this.popover)
    $(document).off('keydown', this.holdshift)
    $(document).off('keyup', this.releaseShift)
    $('#popover').hide()
    this.data.plusActive = false
    this.data.minusActive = false

    super.deActivateTool()
  }

  /**
   * Event listeners to run for the tool
   */
  toolListeners () {
    // TODO update this to zoom
    this.tool = new paper.Tool()
    this.tool.name = 'toolPath'

    this.tool.onMouseDown = (event) => {
      // if left click

      if (event.event.which === 1) {
        if (this.data.plusActive === true) {
          if (event.modifiers.shift === true) {
            paper.view.zoom = this.changeZoom(-1)
          } else {
            paper.view.zoom = this.changeZoom(1)
          }
        } else if (this.data.minusActive === true) {
          if (event.modifiers.shift === true) {
            paper.view.zoom = this.changeZoom(1)
          } else {
            paper.view.zoom = this.changeZoom(-1)
          }
        }
      } else if (event.event.which === 3) {
        this.deActivateTool()
        super.removeToolIcon()
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /* TODO add pan and zoom
  https://stackoverflow.com/questions/32540165/how-to-pan-using-paperjs
  https://matthiasberth.com/tech/stable-zoom-and-pan-in-paperjs */
  /**
   * Changes the zoom level of the current view
   * @param {Number} delta contains either a negative or positive number indicates which direction to zoom
   * negative is closer, positive is outward
   */
  changeZoom (delta) {
    let factor = 1.05
    if (delta < 0) {
      return paper.view.zoom / factor
    } else {
      return paper.view.zoom * factor
    }
  }

  /**
   * Function for when we hold shift with this tool
   * @param {event} event
   */
  holdShift (event) {
    if (event.shiftKey === true) {
      if (event.data.type === 'plus') {
        super.changeToolIcon('cursor-magnify-minus')
      } else {
        super.changeToolIcon('cursor-magnify-plus')
      }
    }
  }

  /**
   * Function for when we hold shift with this tool
   * Note can't determine the event key type
   * It also only updates after mouse event or moves
   * @param {event} event
   */
  releaseShift (event) {
    if (event.data.type === 'plus') {
      super.changeToolIcon('cursor-magnify-plus')
    } else {
      super.changeToolIcon('cursor-magnify-minus')
    }
  }

  /**
   * Add box when scrolling over canvas
   * https://stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div
   */
  popover (event) {
    $('#popover').css({
      left: event.pageX - 100,
      top: event.pageY - 100
    })
  }
}

export default MagnifyTool
