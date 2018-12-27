import Tool from '../tool.js'

let magnifyTool = new Tool('magnify')

// Is this tool currently on
magnifyTool.data = {
  plusActive: false,
  minusActive: false
}

/**
 * Initialize the tools listeners
 */
magnifyTool.init = function () {
  // Add event-listener for tools
  this.toolListeners()

  // Plus icon for magnify in
  $('#magnify-plus-tool').on('click', (event) => {
    // reset tool to all unactive
    this.deActivateTool()

    if (!this.data.plusActive) {
      $('#magnify-plus-tool').addClass('pure-button-active')
      $('#origami-editor').css('cursor', 'zoom-in')
      this.tool.activate()

      // bind box to cursor
      $(document).on('mousemove', this.popover)

      // shift key update icon
      $(document).on('keydown', { type: 'plus' }, this.holdShift)
      $(document).on('keyup', { type: 'plus' }, this.releaseShift)

      $('#popover').show()
    }

    // indicate that the plus tool is now active
    this.data.plusActive = !this.data.plusActive
  })

  // Minus icon for zooming out
  $('#magnify-minus-tool').on('click', (event) => {
    // reset tool to all unactive
    this.deActivateTool()

    if (!this.data.minusActive) {
      $('#magnify-minus-tool').addClass('pure-button-active')
      $('#origami-editor').css('cursor', 'zoom-out')

      // reactive tool
      this.tool.activate()

      // bind box to cursor
      $(document).on('mousemove', this.popover)

      // shift key update icon
      $(document).on('keydown', { type: 'minus' }, this.holdShift)
      $(document).on('keyup', { type: 'minus' }, this.releaseShift)

      $('#popover').show()
    }

    // indicate that the minus tool is now active
    this.data.minusActive = !this.data.minusActive
  })
}

/**
 * Reset all values for the tool
 */
magnifyTool.deActivateTool = function () {
  $('#magnify-plus-tool').removeClass('pure-button-active')
  $('#magnify-minus-tool').removeClass('pure-button-active')
  $('#origami-editor').css('cursor', 'pointer')

  // remove box from cursor and additional event-listeners
  $(document).off('mousemove', this.popover)
  $(document).off('keydown', this.holdshift)
  $(document).off('keyup', this.releaseShift)
  $('#popover').hide()
  this.data.plusActive = false
  this.data.minusActive = false
  paper.tool = null
}

/**
 * Event listeners to run for the tool
 */
magnifyTool.toolListeners = function () {
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
magnifyTool.changeZoom = function (delta) {
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
magnifyTool.holdShift = function (event) {
  if (event.shiftKey === true) {
    if (event.data.type === 'plus') {
      $('#origami-editor').css('cursor', 'zoom-out')
    } else {
      $('#origami-editor').css('cursor', 'zoom-in')
    }
  }
}

/**
 * Function for when we hold shift with this tool
 * Note can't determine the event key type
 * It also only updates after mouse event or moves
 * @param {event} event
 */
magnifyTool.releaseShift = function (event) {
  if (event.data.type === 'plus') {
    $('#origami-editor').css('cursor', 'zoom-in')
  } else {
    $('#origami-editor').css('cursor', 'zoom-out')
  }
}

/**
 * Add box when scrolling over canvas
 * https://stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div
 */
magnifyTool.popover = function (event) {
  $('#popover').css({
    left: event.pageX - 100,
    top: event.pageY - 100
  })
}

export default magnifyTool
