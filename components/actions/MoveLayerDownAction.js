
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
    // recall the layers are displayed in reverse
    let layers = paper.project.layers
    let reversedIndex = (layers.length - 1) - this.index
    MoveLayer.insertAndShift(paper.project.layers, reversedIndex, reversedIndex + 1)

    // call redraw
    $('#layer-manager').trigger('draw', [this.index - 1])

    // push back to undo stack
    super.undo()
  }

  /**
   * Move layer down
   */
  redo () {
    let layers = paper.project.layers
    let reversedIndex = (layers.length - 1) - this.index
    MoveLayer.insertAndShift(layers, reversedIndex + 1, reversedIndex)

    // call redraw
    $('#layer-manager').trigger('draw', [this.index])

    // push action to redo stack
    super.redo()
  }
}
export default MoveDownAction
