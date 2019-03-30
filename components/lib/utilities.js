
/**
 * Object containing function that are used regularly
 */
export default {
  serialize (row, column, layer) {
    return row + '.' + column + '.' + layer
  },

  /**
   * Reinsert triangle back onto paper canvas
   * @param {Triangle} triangle - Our custom triangle class
   * @param {Number} layerID - the id of the layer we are reinserting to
   */
  reinsertTriangle (triangle, layerID) {
    // loop through layers and get layer by id
    let layers = paper.project.layers
    let reInsertLayer
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
      let layer = layers[layerIndex]
      if (layer._id === layerID) {
        reInsertLayer = layer
        break
      }
    }

    if (reInsertLayer !== undefined) {
      let childIndex = reInsertLayer.children.length
      reInsertLayer.insertChild(childIndex, triangle.path)
    }
  }
}
