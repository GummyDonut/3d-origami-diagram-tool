
import Tool from '../tool.js'
import Triangle from '../lib/Triangle.js'
import TriangleOptions from '../toolOptions/TriangleOptions.js'
import actionStack from '../actionStack.js'
import AddTrianglesAction from '../actions/AddTrianglesAction.js'
import OverwriteTrianglesAction from '../actions/OverwriteTrianglesAction.js'
import PopoverCursor from '../lib/PopoverCursor.js'
import utilities from '../lib/utilities.js'
import GroupActions from '../actions/GroupActions.js'
import grid from '../grid.js'

class LineTool extends Tool {
  constructor () {
    super('#line-tool', 'lineTool')
    this.popoverMove = new PopoverCursor(this.popoverCursorAction.bind(this), 1)
    this.toolOption = new TriangleOptions(this.popoverMove)

    // need to store this way so I can unbind properly
    this.popoverFunction = this.popoverMove.popover.bind(this.popoverMove)
    this.hidePopoverFunction = this.popoverMove.hidePopover.bind(this)

    // path that represents the current line we are drawing
    this.line = null
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
        super.changeToolIcon('cursor-line')

        $(this.selector).addClass('pure-button-active')

        $('#origami-editor').on('mousemove', this.popoverFunction)
        $('#origami-editor').on('mouseout', this.hidePopoverFunction)

        // // add options to tool options box
        // this.toolOption.addToToolOptionBox()

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

    // Tools behave slightly differently with line tool
    // this.tool.onMouseDown = this.popoverMove.isWithinPopover.bind(this.popoverMove)
    // this.tool.onMouseDrag = this.popoverMove.isWithinPopover.bind(this.popoverMove)

    this.tool.onMouseDrag = this.lineDrag.bind(this)
    this.tool.onMouseUp = this.onMouseUp.bind(this)

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /**
   * On down click we need to add a point for
   */
  lineDrag (event) {
    // remove if it exists, so that one line is only
    // visible at a time
    if (this.line != null) {
      this.line.remove()
    }

    // draw the
    this.line = new paper.Path()
    this.line.strokeColor = 'black'
    this.line.add(event.downPoint)
    this.line.add(event.point)
  }

  onMouseUp (event) {
    // Get the chance
    let lineDownSquare = utilities.getRowColumn(event.downPoint.x, event.downPoint.y)
    let lineEndSquare = utilities.getRowColumn(event.point.x, event.point.y)

    // between the two squares the one with the lower column value represents
    // the square we will start looping from
    if (lineDownSquare.row < lineEndSquare.row) {
      this.lineInsideSquares(lineDownSquare, lineEndSquare)
    } else {
      this.lineInsideSquares(lineEndSquare, lineDownSquare)
    }
  }

  /**
   * From the startSquare loop through and check if the line is inside the square
   * all the way till the endSquare. If the line is inside the square add a triangle
   */
  lineInsideSquares (startSquare, endSquare) {
    // Get the point to start from horizontally
    let startingColumnNumber
    let endingColumnNumber
    if (startSquare.column < endSquare.column) {
      startingColumnNumber = startSquare.column
      endingColumnNumber = endSquare.column
    } else {
      startingColumnNumber = endSquare.column
      endingColumnNumber = startSquare.column
    }

    for (let rowIndex = startSquare.row; rowIndex <= endSquare.row; rowIndex++) {
      let gridRow = grid.grid[rowIndex]
      for (let columnIndex = startingColumnNumber; columnIndex <= endingColumnNumber; columnIndex++) {
        let gridSquare = gridRow[columnIndex]

        // check if the line is inside the rectangle
        if (this.line.intersects(gridSquare.square.path)) {
          let bob = new Triangle(gridSquare.square.rectangle, {
            'strokeColor': this.toolOption.strokeColor,
            'fillColor': this.toolOption.fillColor,
            'fill': this.toolOption.fill
          })
        }
      }
    }
  }

  /**
   * Either remove or update the triangle that will be in the grid
   * @param {Object} gridSquare - contains the rectangle, and path object we
   * will be using to add a triangle in.
   * @returns {Object} represents what kind of action we need to push
   */
  clickedInsideSquare (gridSquare) {
    // Get the triangle on the layer we are currently using
    let activeLayer = paper.project.activeLayer

    let triangle = gridSquare.triangles[activeLayer._id]

    if (triangle === undefined || triangle == null) {
      // The center should be the center of the square as well
      // store the triangle
      gridSquare.triangles[activeLayer._id] = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': this.toolOption.strokeColor,
        'fillColor': this.toolOption.fillColor,
        'fill': this.toolOption.fill
      })

      // push action onto stack
      return new AddTrianglesAction([gridSquare], activeLayer._id)
    } else {
      // If the gridSquare triangle matches do not redraw
      if (triangle.matches(this.toolOption)) {
        return
      }

      // If a triangle exist we will overwrite it
      triangle.path.remove()
      let oldTriangle = gridSquare.triangles[activeLayer._id]
      gridSquare.triangles[activeLayer._id] = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': this.toolOption.strokeColor,
        'fillColor': this.toolOption.fillColor,
        'fill': this.toolOption.fill
      })

      // push action onto stack
      return new OverwriteTrianglesAction([gridSquare], [oldTriangle], activeLayer._id)
    }
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    $('#origami-editor').off('mousemove', this.popoverFunction)
    $('#origami-editor').off('mouseout', this.hidePopoverFunction)
    this.hidePopoverFunction()

    super.deActivateTool()
  }

  /**
   * How we are modifying the gridsquares upon click
   * @param {Array of GridSquare} gridSquares
   */
  popoverCursorAction (gridSquares) {
    let changedSquares = []

    // loop through and update
    gridSquares.forEach(gridSquare => {
      let insideSquare = this.clickedInsideSquare(gridSquare)
      if (insideSquare !== undefined) {
        changedSquares.push(insideSquare)
      }
    })

    if (changedSquares.length > 0) {
      actionStack.pushToUndo(new GroupActions(changedSquares), 'new')
    }
  }
}

/**
 * Tool for clicking the triangle
 */
export default LineTool
