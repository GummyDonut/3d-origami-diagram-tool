import addLayer from './layerManager/AddLayer.js'

export default {

  /**
   * Function to start the layer manager
   */
  init () {
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
    // Custom event listeners
    $(addLayer.selector).on('draw', this.draw)

    addLayer.init()
  },

  /**
   * Update the layer manager
   */
  draw () {
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
      // TODO CREATE COMPONENT HERE TO INSERT
      container.append(layer.name)
    })

    // weird quirk updating the
    // http://paperjs.org/tutorials/project-items/project-hierarchy/#accessing-children-by-name
    console.log(paper.project)
  }
}
