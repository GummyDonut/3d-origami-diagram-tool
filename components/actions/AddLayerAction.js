
import Action from './Action.js'

// TODO Create action object for adding layer
class AddLayerAction extends Action {
  /**
   * Store the layer we are going to delete or readd back
   * @param {Layer} layer paperjs layer object
   * @param {Number} index The position it was added at
   */
  constructor (index, layer) {
    super()

    this.index = index
    this.layer = layer
  }

  undo () {
    this.layer.remove()

    // call redraw
    $('#layer-manager').trigger('draw', [0])

    // push action to redo stack
    super.undo()
  }

  redo () {
    paper.project.insertLayer(this.index, this.layer)

    // call redraw
    $('#layer-manager').trigger('draw', [0])

    // push back to undo stack
    super.redo()
  }
}
export default AddLayerAction
