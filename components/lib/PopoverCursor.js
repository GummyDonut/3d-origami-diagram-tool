import grid from '../grid.js'
let popover = $('#popover')

/**
 * Library of functions to use for manipulating the popover as cursor
 */
class PopoverCursor {
  /**
   *
   * @param {Function} popoverCursorAction function we will be running when we click
   * @param {Integer} cursorSize Represents how many gridSquares big the cursor should be
   */
  constructor (popoverCursorAction, cursorSize) {
    this.popoverCursorAction = popoverCursorAction
    this.cursorSize = cursorSize
  }

  /**
   * Show the popover
   * @param {*} event - Mouse Event
   */
  popover (event) {
    // check if popover is hidden
    let visible = popover.is(':visible')

    // Note when making options we will offset by one because grid is shifted
    let boxHeight = grid.squareHeight * this.cursorSize
    let boxWidth = grid.squareWidth * this.cursorSize
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
    // check the cursorsize for more accurate single pixel
    // zero is the shifted down 1 pixel
    if (this.cursorSize === 1) {
      this.singleClickPopover(event)
      return
    }

    // create point so we can use library function
    // let clickPoint = new paper.Point(event.point.x, event.point.y)
    let boxWidth = grid.squareWidth * (this.cursorSize - 1)
    let boxHeight = grid.squareHeight * (this.cursorSize - 1)
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

  /**
   * Run when we need the more accurate single click
   * @param {*} event
   */
  singleClickPopover (event) {
    // create point so we can use library function
    let clickPoint = new paper.Point(event.point.x, event.point.y)
    let canvasGrid = grid.grid

    // Loop through to check if we clicked in the possible area
    // IF laggy, possibly update this
    // TODO UPDATE THIS TO ONLY SEARCH A PORTION OF GRID
    for (let rowIndex = 0; rowIndex < canvasGrid.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < canvasGrid[rowIndex].length; columnIndex++) {
        let square = canvasGrid[rowIndex][columnIndex].square.rectangle
        if (clickPoint.isInside(square)) {
          // add triangle or remove triangle based on whats inside the square
          this.popoverCursorAction([canvasGrid[rowIndex][columnIndex]])
          return
        }
      }
    }
  }
}

export default PopoverCursor
