import EditLayerAction from '../actions/EditLayerAction.js'
import actionStack from '../actionStack.js'

// layer Utils
import layerUtils from './lib/layerUtils.js'

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
      this.layerIndex = selectedLayer.index()
      if (selectedLayer.length === 0) {
        alert('Please select a layer to edit')
      } else {
        this.layerIndex = selectedLayer.index()
        let layerToEdit = layerUtils.getLayer(this.layerIndex)

        // if the layer is the grid one do not remove
        if (layerToEdit.name !== 'GRID') {
          $('#edit-layer-name').val(layerToEdit.name)
        } else {
          alert('You cannot edit the GRID Layer')
        }
      }

      $('#layer-edit').dialog('open')
    })

    /**
       * Event listener f
       */
    $('#edit-layer-ok').on('click', () => {
      let newName = $('#edit-layer-name').val()

      // make sure name does not exist yet
      let checkLayer = paper.project.layers[newName]
      if (checkLayer !== undefined) {
        alert('Name already exists... Please choose another name')
        return
      }

      let editingLayer = layerUtils.getLayer(this.layerIndex)
      let oldName = editingLayer.name
      editingLayer.name = newName

      actionStack.pushToUndo(new EditLayerAction(0, editingLayer, { 'name': oldName }))

      $('#layer-edit').dialog('close')

      // call redraw action
      // trigger custom event to tell parent that we added a layer
      $('#layer-manager').trigger('draw', [this.layerIndex])
    })

    $('#edit-layer-cancel').on('click', () => {
      $('#layer-edit').dialog('close')
    })
  }
}
export default new EditLayer()
