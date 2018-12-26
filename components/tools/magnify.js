
export default {
  data: {
    // Is this tool currently on
    active: false
  },

  // tool object that is stored here, we will activate or turn this
  // on appropriately
  tool: null,

  /**
   * Initialize the tool on start of the program
   * Install event-listener for tool-box
   * and create tool
   */
  init () {
    // Add event-listener for tools
    this.toolListeners()

    $('#magnify-plus').on('click', (event) => {
      if (!this.data.active) {
        $('#magnify-plus').addClass('pure-button-active')
        $('#origami-editor').css('cursor', 'zoom-in')
        this.tool.activate()

        // bind box to cursor
        $(document).on('mousemove', this.popover)

        // shift key update icon
        $(document).on('keydown', this.holdShift)
        $(document).on('keyup', this.releaseShift)

        $('#popover').show()
      } else {
        this.deActivateTool()
      }

      this.data.active = !this.data.active
    })
  },
  deActivateTool () {
    $('#magnify-plus').removeClass('pure-button-active')
    $('#origami-editor').css('cursor', 'pointer')

    // remove box from cursor and additional event-listeners
    $(document).off('mousemove', this.popover)
    $(document).off('keydown', this.holdshift)
    $(document).off('keyup', this.releaseShift)
    $('#popover').hide()
    paper.tool = null
  },

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
        if (event.modifiers.shift === true) {
          paper.view.zoom = this.changeZoom(-1)
        } else {
          paper.view.zoom = this.changeZoom(1)
        }
      } else if (event.event.which === 3) {
        this.deActivateTool()
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  },

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
  },

  /**
   * Function for when we hold shift with this tool
   * @param {event} event
   */
  holdShift (event) {
    if (event.shiftKey === true) {
      $('#origami-editor').css('cursor', 'zoom-out')
    }
  },

  /**
   * Function for when we hold shift with this tool
   * Note can't determine the event key type
   * It also only updates after mouse event or moves
   * @param {event} event
   */
  releaseShift (event) {
    $('#origami-editor').css('cursor', 'zoom-in')
  },

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
