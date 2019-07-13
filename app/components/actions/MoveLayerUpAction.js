
import Action from './Action.js'
import MoveLayer from '../layerManager/lib/MoveLayer.js'
class MoveUpAction extends Action {
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

  /**
   * Move the layer down
   */
  undo () {
    let layers = paper.project.layers
    let reversedIndex = (layers.length - 1) - this.index
    MoveLayer.insertAndShift(layers, reversedIndex, reversedIndex - 1)

    // call redraw
    $('#layer-manager').trigger('draw', [this.index + 1])

    // push back to undo stack
    super.undo()
  }

  /**
   * Move layer up
   */
  redo () {
    // recall the layers are displayed in reverse
    let layers = paper.project.layers
    let reversedIndex = (layers.length - 1) - this.index
    MoveLayer.insertAndShift(paper.project.layers, reversedIndex - 1, reversedIndex)

    // call redraw
    $('#layer-manager').trigger('draw', [this.index])

    // push action to redo stack
    super.redo()
  }
}
export default MoveUpAction
