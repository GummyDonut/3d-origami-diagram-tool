export default {
  /**
   * Get the layer from the paper.project.layers object
   * we have a separate function for this because the manager is rendered in reverse
   * @param {Number} layerIndex - index on which the layer is on the toolbox
   */
  getLayer (layerIndex) {
    let layers = paper.project.layers

    // recall the table is rendered in reverse of the actual project.layers
    return layers[(layers.length - 1) - layerIndex]
  }
}
