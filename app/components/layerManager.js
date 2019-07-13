import addLayer from './layerManager/AddLayer.js'
import deleteLayer from './layerManager/DeleteLayer.js'
import MoveLayerUp from './layerManager/MoveLayerUp.js'
import MoveLayerDown from './layerManager/MoveLayerDown.js'
import EditLayer from './layerManager/EditLayer.js'
import DuplicateLayer from './layerManager/DuplicateLayer.js'
import constants from './lib/constants.js'

// Layer Utilities
import layerUtils from './layerManager/lib/layerUtils.js'
import layerHTML from 'components/layerManager/components/layer.html'
export default {

  // TODO make sure all the layer names are unique
  layerHTML: layerHTML,
  selectedLayer: 0, // index indicating the selected layer
  selector: '#layer-manager',
  /**
   * Function to start the layer manager
   */
  init () {
    // grab the html content to use over and over again
    $(this.selector).dialog({
      'position': {
        'my': 'right top',
        'at': 'left top',
        'of': $('#tool-options')
      },
      'width': 200,
      'height': 400,
      'minHeight': 260
    })

    // close on start
    $(this.selector).dialog('close')

    $(this.selector).on('dialogclose', function (event) {
      $('#tool-bar-showlayers > svg').hide()
    })

    // keep to the right until reaches min width
    $(window).resize(() => {
      let windowWidth = $(window).width()

      // if less than 900 move to the left
      if (windowWidth < constants.MINWINDOWWIDTH) {
        $(this.selector).dialog('option', 'position', { my: 'right bottom', at: 'right bottom', of: window })
      }
    })

    this.initEventListener()

    this.draw()
  },

  /**
   * Init all the event-listeners on the layout manager
   */
  initEventListener () {
    // alias
    var self = this

    // Custom event listeners
    $(this.selector).on('draw', this.draw.bind(this))

    // Clicking on the layer should update its selected
    $(this.selector + ' div.layer-container').on('click', 'div.layer-row', function () {
      // remove selected from other rows and add to other row
      $(self.selector + ' div.layer-container div.layer-row').removeClass('selected')
      $(this).addClass('selected')
      self.selectedLayer = $(this).index()
      layerUtils.getLayer(self.selectedLayer).activate()
    })

    // Tools for layer manager
    addLayer.init()
    deleteLayer.init()
    MoveLayerUp.init()
    MoveLayerDown.init()
    EditLayer.init()
    DuplicateLayer.init()
  },

  /**
   * Update the layer manager
   * @param {Number} selectedLayer Number indicating which layer to show as selected
   */
  draw (event, selectedLayer) {
    // Get the layers
    let layers = paper.project.layers

    if (layers === undefined) {
      console.log('There is an error, we lost reference to layers')
    }
    // If there is only one layer and has no name set a default name
    if (layers.length === 1 && layers[0].name === null) {
      layers[0].name = 'GRID'
    }

    // clear out content
    // attempt to possibly keep all event-listeners
    let container = $(this.selector + ' div.layer-container')
    container.empty()

    // loop through layers in reverse, note the slice is a shallow copy
    layers.slice().reverse().forEach((layer) => {
      container.append(this.layerHTML)
      let newRow = container.find('div.layer-row:last-child')
      $(newRow).find('span.layer-name').text(layer.name)
      newRow.attr('id', 'layer-' + layer._id)
    })

    // If there was only one layer select it, anymore use options
    if (layers.length === 1) {
      $(this.selector + ' div.layer-row').addClass('selected')
      this.selectedLayer = 0
      layerUtils.getLayer(0).activate()
    } else if (selectedLayer !== undefined) {
      let selected = $(this.selector + ' .layer-container div.layer-row')[selectedLayer]
      $(selected).addClass('selected')
      layerUtils.getLayer(selectedLayer).activate()
    }
  }
}
