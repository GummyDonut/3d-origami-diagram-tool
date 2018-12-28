import Tool from '../tool.js'

class panTool extends Tool {
  constructor () {
    super()
    this['tool-type'] = 'pan'
    this.data = {
      active: false
    }
  }

  init () {
    // initialize event-listeners for button
    this.buttonEventListener()
  }

  buttonEventListener () {
    $('#pan-tool').on('click', () => {
      if (!this.data.active) {
        super.changeToolIcon('cursor-pan')
      }

      this.data.active = !this.data.active
    })
  }
  deActivateTool () {
    this.data.active = false
  }
}

/**
 * Tool for panning the canvas
 */
export default panTool
