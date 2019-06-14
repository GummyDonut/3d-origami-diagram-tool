import grid from '../grid.js'
import utils from './utilities.js'
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
      // increase popover by zoom factor
      popover.css('height', boxHeight * paper.view.zoom + 'px')
      popover.css('width', boxWidth * paper.view.zoom + 'px')
    }

    popover.css({
      left: event.pageX - (boxWidth * paper.view.zoom / 2),
      top: event.pageY - (boxHeight * paper.view.zoom / 2)
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

    let boxWidth = grid.squareWidth * (this.cursorSize - 1)
    let boxHeight = grid.squareHeight * (this.cursorSize - 1)

    let topLeft = {
      'x': event.point.x - (boxWidth / 2),
      'y': event.point.y - (boxHeight / 2)
    }
    let bottomRight = {
      'x': event.point.x + (boxWidth / 2),
      'y': event.point.y + (boxWidth / 2)
    }

    let topleftRowColumn = utils.getRowColumn(topLeft.x, topLeft.y)
    let bottomRightRowColumn = utils.getRowColumn(bottomRight.x, bottomRight.y)

    if (topleftRowColumn === null || bottomRightRowColumn === null) {
      return null
    }

    let popoverRectangle = new paper.Rectangle(topLeft.x, topLeft.y, boxWidth, boxHeight)

    let gridSquaresWithinPopover = []

    let canvasGrid = grid.grid
    for (let rowIndex = topleftRowColumn.row; rowIndex <= bottomRightRowColumn.row; rowIndex++) {
      for (let columnIndex = topleftRowColumn.column; columnIndex <= bottomRightRowColumn.column; columnIndex++) {
        let square = canvasGrid[rowIndex][columnIndex].square.rectangle
        if (popoverRectangle.intersects(square)) {
          if (canvasGrid[rowIndex][columnIndex] !== undefined) {
            gridSquaresWithinPopover.push(canvasGrid[rowIndex][columnIndex])
          }
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
    let rowColumn = utils.getRowColumn(event.point.x, event.point.y)
    if (rowColumn === null) {
      return
    }
    if (grid.grid[rowColumn.row][rowColumn.column] !== undefined) {
      this.popoverCursorAction([grid.grid[rowColumn.row][rowColumn.column]])
    }
  }
}

export default PopoverCursor
