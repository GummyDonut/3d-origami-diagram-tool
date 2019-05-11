
import Tool from '../tool.js'
import TriangleOptions from '../toolOptions/TriangleOptions.js'
import actionStack from '../actionStack.js'
import PopoverCursor from '../lib/PopoverCursor.js'
import GroupActions from '../actions/GroupActions.js'
import utilities from '../lib/utilities.js'

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
      let insideSquare = utilities.insertTriangle(gridSquare, this.toolOption)
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
export default TriangleTool
