import actionStack from '../actionStack.js'
import DuplicateLayerAction from '../actions/DuplicateLayerAction.js'
/**
 * Function for adding a new layer
 */
class DuplicateLayer {
  constructor () {
    this.selector = '#layer-manager-duplicate'
  }

  init () {
    this.initEventListeners()
  }

  initEventListeners () {
    $(this.selector).on('click', () => {
      // check for selected layer
      // Get the selected layer
      let selectedLayer = $('#layer-manager div.layer-container div.layer-row.selected')
      if (selectedLayer.length !== 0) {
        let layerIndex = selectedLayer.index()
        // Get list of all layer names
        let layers = paper.project.layers
        let layerToDuplicate = layers[layerIndex]

        // do not allow duplication of GRID
        if (layerToDuplicate.name === 'GRID') {
          alert('You cannot duplicate the GRID')
          return
        }

        const constName = 'copy_' + layerToDuplicate.name
        let tempName = constName
        let count = 1
        while (paper.project.layers[tempName] !== undefined) {
          tempName = constName + count
          count++
        }

        let newLayer = new paper.Layer({
          name: tempName
        })

        // copy the content from original to duplicate
        newLayer.copyContent(layerToDuplicate)

        // TODO update with redo/undo actions
        paper.project.insertLayer(0, newLayer)
        actionStack.pushToUndo(new DuplicateLayerAction(0, newLayer), 'new')

        // trigger custom event to tell parent that we added a layer
        $('#layer-manager').trigger('draw', [0])

        console.log(paper.project)
      } else {
        alert('Please select a layer to duplicate')
      }
    })
  }
}

export default new DuplicateLayer()
