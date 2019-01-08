import Tool from '../tool.js'

class singleTriangleTool extends Tool {
  constructor () {
    super()
    this['tool-type'] = 'single-triangle'
    this.selector = '#triangle-single-tool'
  }

  /**
   * Initialize the tool
   */
  init () {
    // initialize event-listeners for button
    this.buttonEventListener()
  }

  buttonEventListener () {
    $(this.selector).on('click', () => {
      if (!this.data.active) {
        super.changeToolIcon('cursor-single-triangle')

        // reactive tool
        this.tool.activate()
        this.data.active = true
      } else {
        this.deActivateTool()
      }
    })
  }
}

/**
 * Tool for clicking the triangle
 */
export default singleTriangleTool
