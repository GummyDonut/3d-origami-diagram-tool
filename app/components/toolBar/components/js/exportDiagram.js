import loadingDialog from '../../../common/js/LoadingDialog.js'
import util from '../../../lib/utilities.js'
export default {

  loadingDialogOptions: {
    title: 'Exporting',
    slot: 'Exporting file, please be patient.'
  },

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
  },

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
