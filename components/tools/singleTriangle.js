import grid from '../grid.js'
import Tool from '../tool.js'
import Triangle from '../lib/triangle.js'
import SingleTriangleOptions from '../toolOptions/singleTriangleOptions.js'
import actionStack from '../actionStack.js'
import AddTrianglesAction from '../actions/AddTrianglesAction.js'
import OverwriteTrianglesAction from '../actions/OverwriteTrianglesAction.js'

let toolOption = new SingleTriangleOptions()

class singleTriangleTool extends Tool {
  constructor () {
    super('#triangle-single-tool', 'singleTriangleTool')
    this.toolOption = toolOption
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
        super.changeToolIcon('cursor-single-triangle')

        $(this.selector).addClass('pure-button-active')

        // add options to tool options box
        this.toolOption.addToToolOptionBox()

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

    this.tool.onMouseDown = (event) => {
      // create point so we can use library function
      let clickPoint = new paper.Point(event.point.x, event.point.y)
      let canvasGrid = grid.grid

      // Loop through to check if we clicked in the possible area
      // IF laggy, possibly update this
      for (let rowIndex = 0; rowIndex < canvasGrid.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < canvasGrid[rowIndex].length; columnIndex++) {
          let square = canvasGrid[rowIndex][columnIndex].square.rectangle
          if (clickPoint.isInside(square)) {
            // add triangle or remove triangle based on whats inside the square
            this.clickedInsideSquare(canvasGrid[rowIndex][columnIndex])
          }
        }
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /**
   * Either remove or update the triangle that will be in the grid
   * @param {Object} gridSquare - contains the rectangle, and path object we
   * will be using to add a triangle in.
   */
  clickedInsideSquare (gridSquare) {
    if (gridSquare.triangle === null) {
      // The center should be the center of the square as well
      gridSquare.triangle = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': this.toolOption.strokeColor,
        'fillColor': this.toolOption.fillColor,
        'fill': this.toolOption.fill
      })

      // push action onto stack
      actionStack.undoStack.push(new AddTrianglesAction([gridSquare]))
    } else {
      // If a triangle exist we will overwrite it
      gridSquare.triangle.path.remove()
      let oldTriangle = gridSquare.triangle
      gridSquare.triangle = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': this.toolOption.strokeColor,
        'fillColor': this.toolOption.fillColor,
        'fill': this.toolOption.fill
      })
      // push action onto stack
      actionStack.undoStack.push(new OverwriteTrianglesAction([gridSquare], [oldTriangle]))
    }
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')
    super.deActivateTool()
  }
}

/**
 * Tool for clicking the triangle
 */
export default singleTriangleTool
