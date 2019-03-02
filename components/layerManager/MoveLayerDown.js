import MoveLayer from './lib/MoveLayer.js'
import actionStack from '../actionStack.js'
import MoveDownAction from '../actions/MoveDownAction.js'
class MoveLayerDown {
  constructor () {
    this.selector = '#layer-manager-move-down'
  }

  init () {
    this.initEventListeners()
  }
  /**
   * Initialize event listeners
   */
  initEventListeners () {
    $(this.selector).on('click', () => {
      let selectedLayer = $('#layer-manager div.layer-container div.layer-row.selected')
      if (selectedLayer && selectedLayer.length === 0) {
        alert('Please select a layer to move')
      } else {
        MoveLayer.moveLayer('down')
        let selectedIndex = selectedLayer.index() + 1
        $('#layer-manager').trigger('draw', [selectedIndex])
        actionStack.pushToUndo(new MoveDownAction(selectedIndex, selectedLayer))
      }
    })
  }
}
export default new MoveLayerDown()
