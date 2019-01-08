import Tool from '../tool.js'
import MagnifyToolOptions from '../toolOptions/magnifyOptions.js'

let toolOption = new MagnifyToolOptions()

class MagnifyTool extends Tool {
  constructor () {
    super()
    this['tool-type'] = 'magnify'
    this.data.plusActive = false
    this.data.minusActive = false
    this.toolOption = toolOption
  }

  /**
  * Initialize the tools listeners
  */
  init () {
    // Add event-listener for tools
    this.toolListeners()

    // Plus icon for magnify in
    // TODO REFACTOR THIS CODE TO ONE FUNCTION
    $('#magnify-plus-tool').on('click', (event) => {
      if (!this.data.plusActive) {
        this.deActivateTool()
        $('#magnify-plus-tool').addClass('pure-button-active')
        super.changeToolIcon('cursor-magnify-plus')
        this.tool.activate()

        // add options to tool options box
        this.toolOption.addToToolOptionBox()

        // bind box to cursor
        $('#origami-editor').on('mousemove', this.popover)
        $('#origami-editor').on('mouseout', this.hidePopover)

        // shift key update icon
        $(document).on('keydown', { type: 'plus' }, this.holdShift)
        $(document).on('keyup', { type: 'plus' }, this.releaseShift)

        $('#popover').show()
        // indicate that the plus tool is now active
        this.data.plusActive = true
        this.data.active = true
      } else {
        this.deActivateTool()
      }
    })

    // Minus icon for zooming out
    $('#magnify-minus-tool').on('click', (event) => {
      if (!this.data.minusActive) {
        this.deActivateTool()
        // reset tool to all unactive
        $('#magnify-minus-tool').addClass('pure-button-active')
        super.changeToolIcon('cursor-magnify-minus')

        // reactive tool
        this.tool.activate()

        // add options to tool options box
        this.toolOption.addToToolOptionBox()

        // bind box to cursor
        $('#origami-editor').on('mousemove', this.popover)
        $('#origami-editor').on('mouseout', this.hidePopover)

        // shift key update icon
        $(document).on('keydown', { type: 'minus' }, this.holdShift)
        $(document).on('keyup', { type: 'minus' }, this.releaseShift)

        $('#popover').show()
        // indicate that the minus tool is now active
        this.data.minusActive = true
        this.data.active = true
      } else {
        this.deActivateTool()
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
    $('#origami-editor').off('mousemove', this.popover)
    $('#origami-editor').off('mouseout', this.hidePopover)
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
    // Create new custom paper tool
    this.tool = new paper.Tool()
    this.tool.name = 'magnifyTool'

    this.tool.onMouseDown = (event) => {
      // if left click

      if (event.event.which === 1) {
        if (this.data.plusActive === true) {
          if (event.modifiers.shift === true) {
            this.changeZoom(-1, event.event.offsetX, event.event.offsetY)
          } else {
            this.changeZoom(1, event.event.offsetX, event.event.offsetY)
          }
        } else if (this.data.minusActive === true) {
          if (event.modifiers.shift === true) {
            this.changeZoom(1, event.event.offsetX, event.event.offsetY)
          } else {
            this.changeZoom(-1, event.event.offsetX, event.event.offsetY)
          }
        }
      } else if (event.event.which === 3) {
        this.deActivateTool()
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /*
  https://stackoverflow.com/questions/32540165/how-to-pan-using-paperjs
  https://matthiasberth.com/tech/stable-zoom-and-pan-in-paperjs */
  /**
   * Changes the zoom level of the current view
   * @param {Number} delta contains either a negative or positive number indicates which direction to zoom
   * negative is closer, positive is outward
   * @param {Number} offsetX event offset where we clicked x axis
   * @param {Number} offsetY event offset where we clicked y axis
   */
  changeZoom (delta, offsetX, offsetY) {
    let percent = this.toolOption.factor
    // if factor is less than 1, error out
    if (percent < 1) {
      alert('Factor can not be lower than one')
      return
    } else if (percent > 100) {
      alert('Factor can not be higher than one hundred')
      return
    }

    // zoom in factor
    let factor = 1 + (percent / 100)

    let viewCenter = paper.view.center
    let mousePosition = new paper.Point(offsetX, offsetY)
    let viewPosition = paper.view.viewToProject(mousePosition)
    let newZoom
    if (delta < 0) {
      newZoom = paper.view.zoom / factor
    } else {
      newZoom = paper.view.zoom * factor
    }

    // scale and update view center
    let beta = paper.view.zoom / newZoom
    let pointC = viewPosition.subtract(viewCenter)
    let newOffset = viewPosition.subtract(pointC.multiply(beta))

    // update the view
    paper.view.zoom = newZoom
    paper.view.center = newOffset
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
    // check if popover is hidden
    let visible = $('#popover').is(':visible')
    if (!visible) {
      $('#popover').show()
    }

    $('#popover').css({
      left: event.pageX - 100,
      top: event.pageY - 100
    })
  }
  hidePopover (event) {
    $('#popover').hide()
  }
}

export default MagnifyTool
