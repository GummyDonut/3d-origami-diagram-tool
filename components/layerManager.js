import addLayer from './layerManager/AddLayer.js'
import deleteLayer from './layerManager/DeleteLayer.js'
import MoveLayerUp from './layerManager/MoveLayerUp.js'
import MoveLayerDown from './layerManager/MoveLayerDown.js'
import EditLayer from './layerManager/EditLayer.js'
import DuplicateLayer from './layerManager/DuplicateLayer.js'

export default {

  // TODO make sure all the layer names are unique
  layerHTML: null,
  selectedLayer: 0, // index indicating the selected layer
  /**
   * Function to start the layer manager
   */
  init () {
    // grab the html content to use over and over again
    $.ajax({
      type: 'GET',
      url: 'components/layerManager/components/layer.html',
      async: false,
      success: (text) => {
        this.layerHTML = text
      }
    })

    $('#layer-manager').dialog({
      'position': {
        'my': 'right top',
        'at': 'left top',
        'of': $('#tool-options')
      },
      'width': 200,
      'height': 400,
      'minHeight': 260
    })

    $('#layer-manager').on('dialogclose', function (event) {
      $('#tool-bar-showlayers > i').hide()
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
    $('#layer-manager').on('draw', this.draw.bind(this))

    // Clicking on the layer should update its selected
    $('#layer-manager div.layer-container').on('click', 'div.layer-row', function () {
      // remove selected from other rows and add to other row
      $('#layer-manager div.layer-container div.layer-row').removeClass('selected')
      $(this).addClass('selected')
      self.selectedLayer = $(this).index()
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
    let container = $('#layer-manager div.layer-container')
    container.empty()

    // loop through layers and add
    layers.forEach((layer) => {
      container.append(this.layerHTML)
      let newRow = container.find('div.layer-row:last-child')
      $(newRow).find('span.layer-name').text(layer.name)
      newRow.attr('id', layer.name)
    })

    // If there was only one layer select it, anymore use options
    if (layers.length === 1) {
      $('#layer-manager div.layer-row').addClass('selected')
      this.selectedLayer = 0
    } else if (selectedLayer !== undefined) {
      let selected = $('#layer-manager .layer-container div.layer-row')[selectedLayer]
      $(selected).addClass('selected')
    }

    // weird quirk updating the
    // http://paperjs.org/tutorials/project-items/project-hierarchy/#accessing-children-by-name
    console.log(paper.project)
  }
}
