
import Action from './Action.js'
import MoveLayer from '../layerManager/lib/MoveLayer.js'
class MoveDownAction extends Action {
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
   * Move the layer up
   */
  undo () {
    MoveLayer.insertAndShift(paper.project.layers, this.index, this.index - 1)

    // call redraw
    $('#layer-manager').trigger('draw', [this.index - 1])

    // push back to undo stack
    super.undo()
  }

  /**
   * Move layer down
   */
  redo () {
    MoveLayer.insertAndShift(paper.project.layers, this.index - 1, this.index)

    // call redraw
    $('#layer-manager').trigger('draw', [this.index])

    // push action to redo stack
    super.redo()
  }
}
export default MoveDownAction
