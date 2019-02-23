import MoveLayer from './lib/MoveLayer.js'
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
        $('#layer-manager').trigger('draw', [selectedLayer.index() + 1])
      }
    })
  }
}
export default new MoveLayerDown()
