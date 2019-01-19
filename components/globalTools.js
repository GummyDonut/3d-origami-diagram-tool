
import actionStack from './actionStack.js'
export default {

  /**
   * Function to initiate the tool bar
   */
  init () {
    this.eventListeners()
  },

  /**
   * Add the event-listener to global tools
   */
  eventListeners () {
    // Undo button event-listener
    $('#undo-button').on('click', () => {
      this.undoClick()
    })

    // Redo button event-listener
    $('#redo-button').on('click', () => {
      this.redoClick()
    })

    // add keyboard shortcut for ctrl+z/undo
    $(document).on('keydown', (e) => {
      if (e.ctrlKey && (e.which === 90)) {
        this.undoClick()
      }
    })

    // add keyboard shortcut for ctrl+y/redo
    $(document).on('keydown', (e) => {
      if (e.ctrlKey && (e.which === 89)) {
        this.redoClick()
      }
    })
  },

  /**
   * Function to run when we need to undo
   */
  undoClick () {
    let lastAction = actionStack.undoStack.pop()
    if (lastAction !== undefined) {
      lastAction.undo()
    }
  },

  /**
   * Function to run when we need to redo
   */
  redoClick () {
    let lastAction = actionStack.redoStack.pop()
    if (lastAction !== undefined) {
      lastAction.redo()
    }
  }

}
