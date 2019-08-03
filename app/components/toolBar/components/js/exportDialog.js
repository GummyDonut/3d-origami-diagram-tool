
/**
 * Singleton representing our dialog
 */

import exportDialogHTML from '../html/exportDialog.html'
import EditorDialog from './EditorDialog.js'
import exportDiagram from './exportDiagram.js'
class ExportDialog extends EditorDialog {
  constructor () {
    super('#export-as-dialog', {
      html: 'exportDialog.html',
      component: exportDialogHTML
    })
  }

  /**
   * Load in event-listeners for the dialog
   */
  loadEventListeners () {
    $('#export-dialog-button').on('click', () => {
      this.export()
    })
  }

  /**
   * Function for exporting the file
   */
  export () {
    let exportAs = $('#export-as-select').val()
    let fileName = $('#export-file-name').val()

    // validate the options
    let valid = this.validate({
      fileName: fileName
    })

    // if options invalid don't export
    if (!valid) {
      return
    }

    // what type of file to export
    switch (exportAs) {
      case 'png':
        exportDiagram.exportAsPNG({
          fileName: fileName
        })
        break
      case 'svg':
        exportDiagram.exportAsSVG({
          fileName: fileName
        })
        break
      default:
        alert('Could not export file type, ' + exportAs + 'is not supported')
    }
  }

  /**
   * Wrapper function for opening the dialog
   */
  openDialog () {
    $(this.selector).dialog('open')
  }
  /**
   * Wrapper function for closing the dialog
   */
  closeDialog () {
    $(this.selector).dialog('close')
  }

  /**
   * Function to call to validate, if problem alert
   * @param {Object} options
   */
  validate (options) {
    if (!options.fileName) {
      alert('No file name provided please add')
      return false
    }

    if (options.fileName.trim() === '') {
      alert('No file name provided please add')
      return false
    }

    return true
  }
}

let exportDialog = new ExportDialog()
export default exportDialog
