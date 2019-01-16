class Action {
  /**
   * Store the path objects that we will need redo/undo the action
   * @param {Array of Path} paths - Paperjs path objects, we will use to redraw or remove the objects
   */
  constructor () {
    this.paths = []
  }
  undo () {
    console.log('No action specified')
  }

  redo () {
    console.log('No redo specified')
  }
}

export default Action
