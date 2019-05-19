
import Tool from '../tool.js'
import grid from '../grid.js'
import BucketOptions from '../toolOptions/BucketOptions.js'
import actionStack from '../actionStack.js'
// import PopoverCursor from '../lib/PopoverCursor.js'
import GroupActions from '../actions/GroupActions.js'
import utilities from '../lib/utilities.js'

class BucketTool extends Tool {
  constructor () {
    super('#bucket-tool', 'bucketTool')
    this.toolOption = new BucketOptions()
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
   * Event-listener for button within toolbox
   */
  buttonEventListener () {
    $(this.selector).on('click', () => {
      if (!this.data.active) {
        super.changeToolIcon('cursor-pointer')

        $(this.selector).addClass('pure-button-active')

        // reactive tool
        this.tool.activate()
        this.data.active = true
      } else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Event-listener for canvas
   */
  toolListeners () {
    // Create new custom paper tool
    this.tool = new paper.Tool()
    this.tool.name = this.toolname

    this.tool.onMouseDown = this.onMouseDown.bind(this)

    paper.tool = null
  }

  /**
   * Function for when we click on the origami editor
   */
  onMouseDown (event) {
    let squareDown = utilities.getRowColumn(event.point.x, event.point.y)

    if (squareDown == null) {
      return
    }

    // determine if needs to be shifted
    let shifted = (squareDown.row % 2 === 0) ? -1 : 0

    // top left square
    this.fillSquare(squareDown.row - 1, squareDown.column + shifted)
    // top right square
    // left square
    // right square
    // bottom left square
    // bottom right square
  }

  /**
   * Fill in the square with a triangle, if there is already a triangle
   * there do not fill in, if it did fill in recursively call the surrounding squares
   * @param {number} row represents the row index
   * @param {number} column represent the column index
   */
  fillSquare (row, column) {
    // sanity check

    if (row == null || column === null) {
      return
    }
    // check if out of bounds
    if (row < 0 || column < 0) {
      return
    }

    // check if out of bounds
    if (row > grid.rowsCount || column > grid.columnsCount) {
      return
    }

    let gridSquare = grid.grid[row][column]

    // check if row is defined
    if (gridSquare == null) {
      return
    }

    utilities.insertTriangle(gridSquare, this.toolOption, {
      'noOverwrite': true
    })
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    super.deActivateTool()
  }
}

/**
 * Tool for clicking the triangle
 */
export default BucketTool
