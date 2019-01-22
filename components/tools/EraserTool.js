
import Tool from '../tool.js'
import PopoverCursor from '../lib/PopoverCursor.js'
import EraserOptions from '../toolOptions/EraserOptions.js'

/**
 * Tool for removing triangles from canvas
 */
class eraserTool extends Tool {
  constructor () {
    super('#eraser-tool', 'eraserTool')

    this.popoverMove = new PopoverCursor(this.popoverCursorAction.bind(this), 1)
    this.popoverFunction = this.popoverMove.popover.bind(this.popoverMove)
    this.hidePopoverFunction = this.popoverMove.hidePopover.bind(this)
    this.toolOption = new EraserOptions(this.popoverMove)
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
        $(this.selector).addClass('pure-button-active')

        super.changeToolIcon('cursor-eraser')
        // bind box to cursor
        $('#origami-editor').on('mousemove', this.popoverFunction)
        $('#origami-editor').on('mouseout', this.hidePopoverFunction)

        // add options
        this.toolOption.addToToolOptionBox()

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
    // loop through and update
    gridSquares.forEach(gridSquare => {
      this.clickedInsideSquare(gridSquare)
    })
  }

  /**
   * Action to run on the square we just clicked
   * @param {Object} gridSquare - contains the rectangle, and path object we
   * will be using to add a triangle in.
   */
  clickedInsideSquare (gridSquare) {
    let triangle = gridSquare.triangle

    // sanity check
    if (triangle !== null) {
      triangle.path.remove()
      gridSquare.triangle = null
    }
  }

  hidePopoverFunction () {
    this.popoverMove.hidePopover()
  }
}

export default eraserTool
