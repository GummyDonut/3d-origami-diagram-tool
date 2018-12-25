
export default {
  data: {
    // Is this tool currently on
    active: false
  },

  // tool object that is stored here, we will activate or turn this
  // on appropriately
  tool: null,
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

    // remove box from cursor
    $(document).off('mousemove', this.popover)
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

    let path

    this.tool.onMouseDown = (event) => {
      // if left click
      if (event.event.which === 1) {
        path = new paper.Path()
        path.strokeColor = '#424242'
        path.strokeWidth = 4
        path.add(event.point)
      } else if (event.event.which === 3) {
        this.deActivateTool()
      }
    }

    this.tool.onMouseDrag = function (event) {
      path.add(event.point)
    }
    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
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
