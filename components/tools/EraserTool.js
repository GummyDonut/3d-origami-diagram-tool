
import Tool from '../tool.js'
import PopoverCursor from '../lib/PopoverCursor.js'

/**
 * Tool for removing triangles from canvas
 */
class eraserTool extends Tool {
  constructor () {
    super('#eraser-tool', 'eraserTool')

    this.popoverMove = new PopoverCursor(this.popoverCursorAction, 3)
    this.popoverFunction = this.popoverMove.popover.bind(this.popoverMove)
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
        $('#origami-editor').on('mouseout', this.popoverMove.hidePopover)

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

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    $('#origami-editor').off('mousemove', this.popoverFunction)
    $('#origami-editor').off('mouseout', this.popoverMove.hidePopover)
    this.popoverMove.hidePopover()

    super.deActivateTool()
  }
  /**
  * How we are modifying the gridsquares upon click
  * @param {Array of GridSquare} gridSquares
  */
  popoverCursorAction (gridSquares) {
    // loop through and update
    gridSquares.forEach(gridSquare => {
      gridSquare.square.path.fillColor = 'red'
    })
  }
}

export default eraserTool
