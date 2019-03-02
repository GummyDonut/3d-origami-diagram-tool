
import Action from './Action.js'

/**
 * Note this action is very similar to add action
 */
class DuplicationLayerAction extends Action {
  /**
   * Store the layer we are going to delete or read back
   * @param {Number} index The position it was removed from
   * @param {Layer} layer the layer we are removing - paperjs layer object
   */
  constructor (index, layer) {
    super()

    this.index = index
    this.layer = layer
  }

  /**
   * Remove the layer
   */
  undo () {
    this.layer.remove()

    // call redraw
    $('#layer-manager').trigger('draw', [0])

    // push action to redo stack
    super.undo()
  }

  /**
   * Add layer back in
   */
  redo () {
    paper.project.insertLayer(this.index, this.layer)

    // call redraw
    $('#layer-manager').trigger('draw', [0])

    // push back to undo stack
    super.redo()
  }
}
export default DuplicationLayerAction
