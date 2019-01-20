import grid from '../grid.js'
let popover = $('#popover')

/**
 * Library of functions to use for manipulating the popover as cursor
 */
class PopoverCursor {
  constructor (popoverCursorAction) {
    this.popoverCursorAction = popoverCursorAction
  }

  /**
   * Show the popover
   * @param {*} event - Mouse Event
   */
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

  hidePopover () {
    popover.hide()
  }

  /**
   * Function for checking if click is within popover
   */
  isWithinPopover (event) {
    // create point so we can use library function
    // let clickPoint = new paper.Point(event.point.x, event.point.y)
    let boxWidth = $('#popover').width()
    let boxHeight = $('#popover').height()
    let popoverX = event.point.x - (boxWidth / 2)
    let popoverY = event.point.y - (boxHeight / 2)
    let popoverRectangle = new paper.Rectangle(popoverX, popoverY, boxWidth, boxHeight)

    let gridSquaresWithinPopover = []

    // Loop through to check if we clicked in the possible area
    // TODO IF laggy, possibly update this
    let canvasGrid = grid.grid
    for (let rowIndex = 0; rowIndex < canvasGrid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < canvasGrid[rowIndex].length; columnIndex++) {
        let square = canvasGrid[rowIndex][columnIndex].square.rectangle
        if (popoverRectangle.intersects(square)) {
          gridSquaresWithinPopover.push(canvasGrid[rowIndex][columnIndex])
        }
      }
    }

    /**
     * If there are any squares to modify
     */
    if (gridSquaresWithinPopover.length > 0) {
      this.popoverCursorAction(gridSquaresWithinPopover)
    }
  }
}

export default PopoverCursor
