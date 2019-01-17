
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
      lastAction.undo()
      console.log(grid)
    })
  }
}
