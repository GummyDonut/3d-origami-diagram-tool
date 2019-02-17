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
      const constName = 'layer'
      let tempName = 'layer'
      let count = 1
      while (paper.project.layers[tempName] !== undefined) {
        tempName = constName + count
        count++
      }

      let newLayer = new paper.Layer({
        name: tempName
      })

      // TODO update with redo/undo actions
      paper.project.insertLayer(0, newLayer)

      // trigger custom event to tell parent that we added a layer
      $('#layer-manager').trigger('draw', [0])

      console.log(paper.project)
    })
  }
}

export default new AddLayer()
