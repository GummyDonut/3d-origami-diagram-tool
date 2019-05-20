// use the canvas border to get the limits
import canvasBorder from '../canvasBorder.js'

export default {

  init () {
    $('#tool-bar-export-svg').on('click', this.exportAsSVG)
    $('#ool-bar-export-png').on('click', this.exportAsPNG)
  },

  /**
   * Export image as svg
   * @param {*} event JQuery click event
   */
  exportAsSVG (event) {
    let options = {
      bounds: 'content', asString: true
    }

    var url = 'data:image/svg+xml;utf8,' + encodeURIComponent(paper.project.exportSVG(options))
    var link = document.createElement('a')
    link.download = 'paperjs_example.svg'
    link.href = url
    link.click()
  },

  /**
   * @param {*} event
   */
  exportAsPNG (event) {
    let options = {
      bounds: 'content', asString: true
    }

    var url = 'data:image/svg+xml;utf8,' + encodeURIComponent(paper.project.exportSVG(options))
    var canvas = document.getElementById('exportCanvas')

    if (canvas.getContext) {
      // Get canvas context
      var context = canvas.getContext('2d')

      // Setup new image object
      var image = new Image()

      image.onload = function () {
        // update the height and width of canvas
        canvas.width = this.width
        canvas.height = this.height

        context.drawImage(this, 0, 0)
        // domURL.revokeObjectURL(url);
        // callback(this);
        var link = document.createElement('a')
        link.download = 'filename.png'
        link.href = paper.view.element.toDataURL()
        link.click()
      }

      // Init the image with our SVG
      image.src = url

      context.drawImage(image, 0, 0)
    }
  }

}
