/**
 * Function for adding a new layer
 */
class AddLayer {
  constructor () {
    this.selector = '#layer-manager-add'
  }

  init () {
    this.initEventListeners()
  }

  initEventListeners () {
    $(this.selector).on('click', () => {
      // Get list of all layer names
      let layers = paper.project.layers
      let layerArray = []
      layers.forEach((layer) => {
        layerArray.push(layer)
      })

      let tempName = 'layer'
      let count = 1
      while (layerArray.indexOf(tempName) > -1) {
        tempName = tempName + count
        count++
      }

      let newLayer = new paper.Layer({
        name: tempName
      })

      // TODO update with redo/undo actions
      paper.project.insertLayer(0, newLayer)

      // make new Layer
      newLayer.activate()

      // trigger custom event to tell parent that we added a layer
      $(this.selector).trigger('draw', [0])

      console.log(paper.project)
    })
  }
}

export default new AddLayer()
