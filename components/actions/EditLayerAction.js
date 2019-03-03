
import Action from './Action.js'

// TODO Create action object for adding layer
class EditLayerAction extends Action {
  /**
   * Store the layer we are editing
   * @param {Layer} layer paperjs layer object
   * @param {Number} index layer index for redrawing
   * @param {Object} options The options that were changed with the edit
   */
  constructor (index, layer, options) {
    super()
    this.index = index
    this.options = options
    this.layer = layer
    this.redoOptions = {}
  }

  undo () {
    // save old name, and undo
    this.redoOptions.name = this.layer.name
    this.layer.name = this.options.name

    // call redraw
    $('#layer-manager').trigger('draw', [this.index])

    // push action to redo stack
    super.undo()
  }

  redo () {
    this.layer.name = this.redoOptions.name

    // call redraw
    $('#layer-manager').trigger('draw', [this.index])

    // push back to undo stack
    super.redo()
  }
}
export default EditLayerAction
