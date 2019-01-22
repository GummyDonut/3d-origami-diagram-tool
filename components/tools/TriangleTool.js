
import Tool from '../tool.js'
import Triangle from '../lib/Triangle.js'
import TriangleOptions from '../toolOptions/TriangleOptions.js'
import actionStack from '../actionStack.js'
import AddTrianglesAction from '../actions/AddTrianglesAction.js'
import OverwriteTrianglesAction from '../actions/OverwriteTrianglesAction.js'
import PopoverCursor from '../lib/PopoverCursor.js'
import GroupActions from '../actions/GroupActions.js'

class TriangleTool extends Tool {
  constructor () {
    super('#triangle-tool', 'TriangleTool')
    this.popoverMove = new PopoverCursor(this.popoverCursorAction.bind(this), 1)
    this.toolOption = new TriangleOptions(this.popoverMove)

    // need to store this way so I can unbind properly
    this.popoverFunction = this.popoverMove.popover.bind(this.popoverMove)
    this.hidePopoverFunction = this.popoverMove.hidePopover.bind(this)
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
        super.changeToolIcon('cursor-triangle')

        $(this.selector).addClass('pure-button-active')

        $('#origami-editor').on('mousemove', this.popoverFunction)
        $('#origami-editor').on('mouseout', this.hidePopoverFunction)

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

    this.tool.onMouseDown = this.popoverMove.isWithinPopover.bind(this.popoverMove)
    this.tool.onMouseDrag = this.popoverMove.isWithinPopover.bind(this.popoverMove)

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /**
   * Either remove or update the triangle that will be in the grid
   * @param {Object} gridSquare - contains the rectangle, and path object we
   * will be using to add a triangle in.
   * @returns {Object} represents what kind of action we need to push
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
      return new AddTrianglesAction([gridSquare])
    } else {
      // If the gridSquare triangle matches do not redraw
      if (gridSquare.triangle.matches(this.toolOption)) {
        return
      }

      // If a triangle exist we will overwrite it
      gridSquare.triangle.path.remove()
      let oldTriangle = gridSquare.triangle
      gridSquare.triangle = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': this.toolOption.strokeColor,
        'fillColor': this.toolOption.fillColor,
        'fill': this.toolOption.fill
      })

      // push action onto stack
      return new OverwriteTrianglesAction([gridSquare], [oldTriangle])
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
      actionStack.pushToUndo(new GroupActions(changedSquares))
    }
  }
}

/**
 * Tool for clicking the triangle
 */
export default TriangleTool
