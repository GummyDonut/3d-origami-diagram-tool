import MoveLayer from './lib/MoveLayer.js'
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
        $('#layer-manager').trigger('draw', [selectedLayer.index() - 1])
      }
    })
  }
}
export default new MoveLayerUp()
