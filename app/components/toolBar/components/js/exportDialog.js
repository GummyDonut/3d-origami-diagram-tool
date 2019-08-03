
/**
 * Singleton representing our dialog
 */
import loadingDialog from '../../../common/js/LoadingDialog.js'
import exportDialogHTML from '../html/exportDialog.html'
import EditorDialog from './EditorDialog.js'
import util from '../../../lib/utilities.js'
class ExportDialog extends EditorDialog {
  constructor () {
    super('#export-as-dialog', {
      html: 'exportDialog.html',
      component: exportDialogHTML
    })

    this.loadingDialogOptions = {
      title: 'Exporting',
      slot: 'Exporting file, please be patient.'
    }
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
        this.exportAsPNG({
          fileName: fileName
        })
        break
      case 'svg':
        this.exportAsSVG({
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

  /**
   * Export image as svg
   * @param {object} options json containing file options
   * such as filename
   */
  exportAsSVG (options) {
    // open loading dialog
    loadingDialog.openDialog(this.loadingDialogOptions)

    let svgOptions = {
      bounds: 'content', asString: true
    }

    // set a small time to wait for so loading dialog can appear properly
    // give the DOM sometime to actually loadin in conten
    util.sleep(500).then(() => {
      var url = 'data:image/svg+xml;utf8,' + encodeURIComponent(paper.project.exportSVG(svgOptions))
      var link = document.createElement('a')
      loadingDialog.closeDialog()
      link.download = options.fileName + '.svg'
      link.href = url
      link.click()
    })
  }

  /**
   * Export as PNG
   * @param {object} options json containing file options
   * such as filename
   */
  exportAsPNG (options) {
    // open loading dialog
    loadingDialog.openDialog(this.loadingDialogOptions)

    let svgOptions = {
      bounds: 'content', asString: true
    }

    // set a small time to wait for so loading dialog can appear properly
    util.sleep(500).then(() => {
      var url = 'data:image/svg+xml;utf8,' + encodeURIComponent(paper.project.exportSVG(svgOptions))
      var canvas = document.getElementById('exportCanvas')

      if (canvas.getContext) {
        // Get canvas context
        var context = canvas.getContext('2d')

        // Setup new image object
        var image = new Image() // eslint-disable-line no-undef

        image.onload = function () {
          loadingDialog.closeDialog()

          // update the height and width of canvas
          canvas.width = this.width
          canvas.height = this.height

          context.drawImage(this, 0, 0)
          // domURL.revokeObjectURL(url);
          // callback(this);
          var link = document.createElement('a')
          link.download = options.fileName + '.png'
          link.href = canvas.toDataURL('image/png')
          link.click()
        }

        // Init the image with our SVG
        image.src = url

        context.drawImage(image, 0, 0)
      }
    })
  }
}

let exportDialog = new ExportDialog()
export default exportDialog
