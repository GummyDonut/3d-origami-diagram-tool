class EditLayer {
  constructor () {
    this.selector = '#layer-manager-edit'
  }

  /**
   * Initialize the edit layer events
   */
  init () {
    $('#layer-edit').dialog({
      title: 'Edit Layer',
      height: 125,
      width: 250,
      autoOpen: false,
      modal: true
    })

    this.initEventListeners()
  }
  /**
   * Initialize event listeners
   */
  initEventListeners () {
    // upon opening the dialog, get the selected
    // and fill in the name
    $(this.selector).on('click', () => {
      // Note you cannot edit the GRID Layer
      // Get the selected layer
      let selectedLayer = $('#layer-manager div.layer-container div.layer-row.selected')
      if (selectedLayer.length === 0) {
        alert('Please select a layer to edit')
        return
      } else {
        let layerIndex = selectedLayer.index()
        let layerToEdit = paper.project.layers[layerIndex]

        // if the layer is the grid one do not remove
        if (layerToEdit.name !== 'GRID') {
          $('#edit-layer-name').val(layerToEdit.name)
        } else {
          alert('You cannot edit the GRID Layer')
          return
        }
      }

      /**
       * Event listener f
       */
      $('#edit-layer-ok').on('click', () => {
        let layerIndex = selectedLayer.index()
        let newName = $('#edit-layer-name').val()
        paper.project.layers[layerIndex].name = newName
        $('#layer-edit').dialog('close')

        // call redraw action
        // trigger custom event to tell parent that we added a layer
        $('#layer-manager').trigger('draw', [layerIndex])
      })

      $('#edit-layer-cancel').on('click', () => {
        $('#layer-edit').dialog('close')
      })

      $('#layer-edit').dialog('open')
    })
  }
}
export default new EditLayer()
