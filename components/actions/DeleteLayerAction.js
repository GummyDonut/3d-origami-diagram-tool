
import Action from './Action.js'

// TODO Create action object for adding layer
class DeleteLayerAction extends Action {
  /**
   * Store the layer we are going to delete or readd back
   * @param {Number} index The position it was removed from
   * @param {Layer} layer the layer we are removing - paperjs layer object
   */
  constructor (index, layer) {
    super()

    this.index = index
    this.layer = layer
  }

  undo () {
    paper.project.insertLayer(this.index, this.layer)

    // call redraw
    $('#layer-manager').trigger('draw', [0])

    // push back to undo stack
    super.undo()
  }

  redo () {
    this.layer.remove()

    // call redraw
    $('#layer-manager').trigger('draw', [0])

    // push action to redo stack
    super.redo()
  }
}
export default DeleteLayerAction
