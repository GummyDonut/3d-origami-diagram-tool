// // use the canvas border to get the limits
// import canvasBorder from '../canvasBorder.js'
import exportDialog from './components/js/exportDialog.js'
import newDialog from './components/js/newDialog.js'
export default {

  init () {
    this.initDialog()
    $('#tool-bar-export-as').on('click', exportDialog.openDialog.bind(exportDialog))
    $('#tool-bar-new-file').on('click', newDialog.openDialog.bind(newDialog))
    // $('#tool-bar-export-svg').on('click', this.exportAsSVG)
    // $('#ool-bar-export-png').on('click', this.exportAsPNG)
  },

  /**
   * Function for initializing the dialog
   */
  initDialog () {
    // promise to load all dialog
    let loadedAll = []

    loadedAll.push(exportDialog.initDialog())
    loadedAll.push(newDialog.initDialog())

    // close on start
    Promise.all(loadedAll).then(() => {
      exportDialog.closeDialog()
      newDialog.closeDialog()
    })
  }

}
