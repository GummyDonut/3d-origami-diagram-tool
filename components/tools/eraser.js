
import Tool from '../tool.js'
import grid from '../grid.js'

let popover = $('#popover')
/**
 * Tool for removing triangles from canvas
 */
class eraserTool extends Tool {
  constructor () {
    super('#eraser-tool', 'eraserTool')
    // this.toolOption = toolOption
  }

  /**
   * Initialize the tool
   */
  init () {
    // initialize event-listeners for button
    this.buttonEventListener()
    this.toolListeners()
  }

  /**
   * Event-listener for the tools button
   */
  buttonEventListener () {
    $(this.selector).on('click', () => {
      if (!this.data.active) {
        // bind box to cursor
        $('#origami-editor').on('mousemove', this.popover)
        $('#origami-editor').on('mouseout', this.hidePopover)
      } else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Paper event-listeners
   */
  toolListeners () {

    // check if click is within popover area
  }

  popover (event) {
    // check if popover is hidden
    let visible = popover.is(':visible')
    let boxHeight = grid.squareHeight * 3 //* 2
    let boxWidth = grid.squareWidth * 3 //* 2
    if (!visible) {
      popover.show()

      // update popover to magnify box
      popover.removeClass()
      popover.addClass('eraser-box')

      // Get the width of the gridSquare, from first square
      popover.css('height', boxHeight + 'px')
      popover.css('width', boxWidth + 'px')
    }

    popover.css({
      left: event.pageX - (boxWidth / 2),
      top: event.pageY - (boxHeight / 2)
    })
  }

  hidePopover (event) {
    popover.hide()
  }
}

export default eraserTool
