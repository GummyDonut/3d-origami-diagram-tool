import grid from '../grid.js'
import Tool from '../tool.js'

class singleTriangleTool extends Tool {
  constructor () {
    super()
    this['tool-type'] = 'single-triangle'
    this.selector = '#triangle-single-tool'
    this.toolname = 'singleTriangleTool'
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
          let square = canvasGrid[rowIndex][columnIndex].rectangle
          if (clickPoint.isInside(square)) {
            canvasGrid[rowIndex][columnIndex].path.fillColor = 'red'
          }
        }
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
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
