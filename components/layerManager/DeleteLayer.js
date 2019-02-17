/**
 * Function for removing a layer
 */
class DeleteLayer {
  constructor () {
    this.selector = '#layer-manager-delete'
  }

  init () {
    this.initEventListeners()
  }

  /**
   * Initialize event listeners
   */
  initEventListeners () {
    $(this.selector).on('click', () => {
      // Get list of all layer names
      let layers = paper.project.layers

      // Get the selected layer
      let selectedLayer = $('#layer-manager div.layer-container div.layer-row.selected')
      if (selectedLayer && selectedLayer.length === 0) {
        alert('Please select a layer to delete')
      } else {
        let layerIndex = selectedLayer.index()
        let layerToDelete = layers[layerIndex]

        // if the layer is the grid one do not remove
        if (layerToDelete.name !== 'GRID') {
          // TODO update with redo/undo actions
          layerToDelete.remove()

          // trigger custom event to tell parent that we added a layer
          $('#layer-manager').trigger('draw', [layers.length - 1])
        } else {
          alert('You are not allowed to remove the GRID layer')
        }
      }
      console.log(paper.project)
    })
  }
}

export default new DeleteLayer()
