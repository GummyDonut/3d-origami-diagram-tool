export default {

  // Array to containing action objects
  undoStack: [],
  redoStack: [],

  /**
   * Function to push actions to undo stack
   * @param {Action} action Action that we will be pushing to the undo stack
   * @param {String} type "new" means we clear redoStack
   */
  pushToUndo (action, type) {
    // when new action is pushed empty out redo stack they are no longer to redo
    if (type === 'new') {
      this.redoStack = []
    }

    // unDisable undo button
    let undoButton = $('#undo-button')
    if (undoButton.prop('disabled')) {
      undoButton.prop('disabled', false)
    }

    let redoButton = $('#redo-button')
    // disable the redo button
    if (this.redoStack.length === 0) {
      redoButton.prop('disabled', true)
    }

    // push onto an undo stack
    this.undoStack.push(action)
  },

  /**
   * Push action to redo stack
   * @param {Action} action Action that we will be pushing to the undo stack
   */
  pushToRedo (action) {
    // check if there is nothing on the undo stack if so then disable undo
    if (this.undoStack.length === 0) {
      $('#undo-button').prop('disabled', true)
    }

    let redoButton = $('#redo-button')

    // enable the redo button, if disabled
    if (redoButton.prop('disabled')) {
      redoButton.prop('disabled', false)
    }

    this.redoStack.push(action)
  }
}
