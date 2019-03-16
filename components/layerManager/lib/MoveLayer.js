/**
 * Library function allows us to move layer
 */
export default {
  /**
   * Move the layer up and down
   * @param {} direction
   */
  moveLayer (direction) {
    // Get the selected layer
    let selectedLayer = $('#layer-manager div.layer-container div.layer-row.selected')

    // Get list of all layer names
    let layers = paper.project.layers
    let layerIndex = selectedLayer.index()
    if (direction === 'up') {
      // can't move up past top
      if (layerIndex - 1 < 0) {
        alert('Cannot move layer up')
      } else {
        // recall the layers are displayed in reverse
        let reversedIndex = (layers.length - 1) - layerIndex
        this.insertAndShift(layers, reversedIndex, reversedIndex + 1)
      }
    } else if (direction === 'down') {
      // can't move up past top
      if (layerIndex + 1 >= layers.length) {
        alert('Cannot move layer down')
      } else {
        // recall the layers are displayed in reverse
        let reversedIndex = (layers.length - 1) - layerIndex
        this.insertAndShift(layers, reversedIndex, reversedIndex - 1)
      }
    }
  },

  /**
   * Insert and shift array element
   * @param {Array} arr Array of layers
   * @param {Number} from the array index we would like to move
   * @param {Number} to the array index we would like to move to
   */
  insertAndShift (arr, from, to) {
    let cutOut = arr.splice(from, 1)[0] // cut the element at index 'from'
    arr.splice(to, 0, cutOut) // insert it at index 'to'
  }
}
