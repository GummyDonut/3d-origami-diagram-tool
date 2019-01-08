import Tool from '../tool.js'

class panTool extends Tool {
  constructor () {
    super()
    this['tool-type'] = 'pan'
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
   * Event listenter for button
   */
  buttonEventListener () {
    $('#pan-tool').on('click', () => {
      if (!this.data.active) {
        super.changeToolIcon('cursor-pan')

        // reactive tool
        this.tool.activate()
        this.data.active = true
      } else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Event listener for the tool, runs when activated
   */
  toolListeners () {
    this.tool = new paper.Tool()
    this.tool.name = 'panTool'

    // on click and drag
    this.tool.onMouseDrag = (event) => {
      this.changeCenter(event)
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /**
   * Update the current view, by modify the current center
   */
  changeCenter (event) {
    // get the different between two points, to get difference in motion
    let delta = event.lastPoint.subtract(event.point)

    // buffer to remove jaggedness
    if ((delta.x > -3 && delta.x < 3) || (delta.y > -3 && delta.y < 3)) {
      return
    }

    paper.view.center = paper.view.center.add(delta)
  }

  /**
   * Deactivate the tool, reset the settings
   */
  deActivateTool () {
    super.deActivateTool()
  }
}

/**
 * Tool for panning the canvas
 */
export default panTool
