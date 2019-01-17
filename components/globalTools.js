
import actionStack from './actionStack.js'
import grid from './grid.js'
export default {

  /**
   * Function to initiate the tool bar
   */
  init () {
    this.eventListeners()
  },

  eventListeners () {
    $('#undo-button').on('click', function () {
      let lastAction = actionStack.undoStack.pop()
      if (lastAction !== undefined) {
        lastAction.undo()
      }
    })

    // add keyboard shortcut for ctrl+z/undo
    $(document).on('keydown', function (e) {
      if (e.ctrlKey && (e.which === 90)) {
        $('#undo-button').trigger('click')
      }
    })
  }
}
