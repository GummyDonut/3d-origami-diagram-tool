import Tool from '../tool.js'

let panTool = new Tool('pan')

panTool.data = {
  active: false
}

panTool.init = function () {
  // initialize event-listeners for button
  this.buttonEventListener()
}

panTool.buttonEventListener = function () {
  $('#pan-tool').on('click', () => {
    if (!this.data.active) {
      $('#origami-editor').css('cursor', 'move')
    }

    this.data.active = !this.data.active
  })
}

panTool.deActivateTool = function () {
  this.data.active = false
}

/**
 * Tool for panning the canvas
 */
export default panTool
