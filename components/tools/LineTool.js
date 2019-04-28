
import Tool from '../tool.js'
import TriangleOptions from '../toolOptions/TriangleOptions.js'
import actionStack from '../actionStack.js'
import PopoverCursor from '../lib/PopoverCursor.js'
import utilities from '../lib/utilities.js'
import GroupActions from '../actions/GroupActions.js'
import grid from '../grid.js'

class LineTool extends Tool {
  constructor () {
    super('#line-tool', 'lineTool')

    // no action on popover
    this.popoverMove = new PopoverCursor(new function () { }(), 1)
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

    // if there is no squares to start from screw it and don't draw
    if (lineDownSquare === null || lineEndSquare === null) {
      this.line.remove()
      this.line = null
      return
    }

    // between the two squares the one with the lower column value represents
    // the square we will start looping from
    if (lineDownSquare.row < lineEndSquare.row) {
      this.lineInsideSquares(lineDownSquare, lineEndSquare)
    } else {
      this.lineInsideSquares(lineEndSquare, lineDownSquare)
    }

    // once complete remove the line from the screen
    this.line.remove()
    this.line = null
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

    let changedSquares = []

    for (let rowIndex = startSquare.row; rowIndex <= endSquare.row; rowIndex++) {
      let gridRow = grid.grid[rowIndex]
      for (let columnIndex = startingColumnNumber; columnIndex <= endingColumnNumber; columnIndex++) {
        let gridSquare = gridRow[columnIndex]

        // check if the line is inside the rectangle
        if (this.line.intersects(gridSquare.square.path)) {
          // check if the triangle that is being added should be an overwrite or a normal add

          let actions = utilities.insertTriangle(gridSquare, this.toolOption)
          if (actions !== undefined) {
            changedSquares.push(actions)
          }
        }
      }
    }

    if (changedSquares.length > 0) {
      actionStack.pushToUndo(new GroupActions(changedSquares), 'new')
    }
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    $('#origami-editor').off('mousemove', this.popoverFunction)
    $('#origami-editor').off('mouseout', this.hidePopoverFunction)
    this.hidePopoverFunction()

    super.deActivateTool()
  }
}

/**
 * Tool for clicking the triangle
 */
export default LineTool
