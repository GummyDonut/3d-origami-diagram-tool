import actionStack from '../actionStack.js'

class Action {
  undo () {
    // when we undo we need to push action onto redo stack
    actionStack.pushToRedo(this)
  }

  redo () {
    // if there is no more redo actions disable button
    if (actionStack.redoStack.length === 0) {
      $('#redo-button').prop('disabled', true)
    }

    // when we redo we have to add back the action onto the stack
    // without disabling the button
    actionStack.pushToUndo(this)
  }
}

export default Action
