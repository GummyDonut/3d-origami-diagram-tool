import Tool from '../tool.js'

class panTool extends Tool {
  constructor() {
    super('#pan-tool', 'panTool')
  }

  /**
   * Initialize the tool
   */
  init() {
    // initialize event-listeners for button
    this.buttonEventListener()
    this.toolListeners()
  }

  /**
   * Event listenter for button
   */
  buttonEventListener() {
    $(this.selector).on('click', () => {

      if (!this.data.active) {
        super.changeToolIcon('cursor-pan')

        $(this.selector).addClass('pure-button-active')
        // reactive tool
        this.tool.activate()
        this.data.active = true
      }

      else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Event listener for the tool, runs when activated
   */
  toolListeners() {
    this.tool = new paper.Tool()
    this.tool.name = this.toolname

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
  changeCenter(event) {
    // get the different between two points, to get difference in motion
    // use downpoint to simply find how far we moved
    // using lastpoint lead to jaggedness in motion as it updated
    let delta = event.downPoint.subtract(event.point)
    paper.view.center = paper.view.center.add(delta)
  }

  /**
   * Deactivate the tool, reset the settings
   */
  deActivateTool() {
    $(this.selector).removeClass('pure-button-active')
    super.deActivateTool()
  }
}

/**
 * Tool for panning the canvas
 */
export default panTool
