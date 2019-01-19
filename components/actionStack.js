export default {

  // Array to containing action objects
  undoStack: [],
  redoStack: [],

  /**
   * Function to push actions to undo stack
   * @param {Action} action Action that we will be pushing to the undo stack
   */
  pushToUndo (action) {
    // when new action is pushed empty out redo stack they are no longer to redo
    this.redoStack = []

    // disable the redo button
    if (!$('#redo-button').prop('disabled')) {
      $('#redo-button').prop('disabled', true)
    }

    // push onto an undo stack
    this.undoStack.push(action)
  },

  /**
   * Push action to redo stack
   * @param {Action} action Action that we will be pushing to the undo stack
   */
  pushToRedo (action) {
    // enable the redo button, if disabled
    if ($('#redo-button').prop('disabled')) {
      $('#redo-button').prop('disabled', false)
    }

    this.redoStack.push(action)
  }
}
