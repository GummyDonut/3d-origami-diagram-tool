import Action from './Action.js'
/**
 * Represents a group of actions to push to stack
 * we will be redoing and undo them as a group
 * contains an array of actions to run all at once
 */
class GroupAction extends Action {
  /**
   * @param {Array of Actions} group - The actions we will be running all at once
   */
  constructor (group) {
    super()
    this.group = group
  }

  /**
   * Run when calling undo note we pass true for grouped
   * so we don't push all undos to stack
   */
  undo () {
    this.group.forEach(action => {
      action.undo(true)
    })
    super.undo()
  }

  /**
   * Run when calling redo note we pass true for grouped
   * so we don't push all redos to stack
   */
  redo () {
    this.group.forEach(action => {
      action.redo(true)
    })
    super.redo()
  }
}

export default GroupAction
