
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
        super.changeToolIcon('cursor-eraser')
        // bind box to cursor
        $('#origami-editor').on('mousemove', this.popover)
        $('#origami-editor').on('mouseout', this.hidePopover)

        this.tool.activate()
        this.data.active = true
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
    // Create new custom paper tool
    this.tool = new paper.Tool()
    this.tool.name = this.toolname

    this.tool.onMouseDown = (event) => {
      // create point so we can use library function
      // let clickPoint = new paper.Point(event.point.x, event.point.y)
      let boxWidth = popover.width()
      let boxHeight = popover.height()
      let popoverX = event.point.x - (boxWidth / 2)
      let popoverY = event.point.y - (boxHeight / 2)
      let popoverRectangle = new paper.Rectangle(popoverX, popoverY, boxWidth, boxHeight)

      // Loop through to check if we clicked in the possible area
      // TODO IF laggy, possibly update this
      let canvasGrid = grid.grid
      for (let rowIndex = 0; rowIndex < canvasGrid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < canvasGrid[rowIndex].length; columnIndex++) {
          let square = canvasGrid[rowIndex][columnIndex].square.rectangle
          if (popoverRectangle.intersects(square)) {
            canvasGrid[rowIndex][columnIndex].square.path.fillColor = 'red'
          }
        }
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    $('#origami-editor').off('mousemove', this.popover)
    $('#origami-editor').off('mouseout', this.hidePopover)
    $('#popover').hide()

    super.deActivateTool()
  }

  popover (event) {
    // check if popover is hidden
    let visible = popover.is(':visible')

    // Note when making options we will offset by one because grid is shifted
    let boxHeight = grid.squareHeight * 3
    let boxWidth = grid.squareWidth * 3
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
