// // use the canvas border to get the limits
// import canvasBorder from '../canvasBorder.js'
import exportDialog from './components/js/exportDialog.js'
export default {

  init () {
    this.initDialog()
    $('#tool-bar-export-as').on('click', exportDialog.openDialog.bind(exportDialog))
    // $('#tool-bar-export-svg').on('click', this.exportAsSVG)
    // $('#ool-bar-export-png').on('click', this.exportAsPNG)
  },

  /**
   * Function for initializing the dialog
   */
  initDialog () {
    let loaded = exportDialog.initDialog()

    // close on start
    loaded.then(() => {
      exportDialog.closeDialog()
    })
  }

}
