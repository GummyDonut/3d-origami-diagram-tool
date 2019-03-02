import MoveLayer from './lib/MoveLayer.js'
import actionStack from '../actionStack.js'
import MoveUpAction from '../actions/MoveUpAction.js'
class MoveLayerUp {
  constructor () {
    this.selector = '#layer-manager-move-up'
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
        MoveLayer.moveLayer('up')
        let selectedIndex = selectedLayer.index() - 1
        $('#layer-manager').trigger('draw', [selectedIndex])
        actionStack.pushToUndo(new MoveUpAction(selectedIndex, selectedLayer))
      }
    })
  }
}
export default new MoveLayerUp()
