/**
 * Contains library functions for magnifying to be used by plus and minus
 */
export default {

  /**
   * Function for when we hold shift with this tool
   * @param {event} event
   * @param {Class} reference to super class
   */
  holdShift (event) {
    if (event.shiftKey === true) {
      if (event.data.type === 'plus') {
        event.data.magnify.changeToolIcon('cursor-magnify-minus')
      } else {
        event.data.magnify.changeToolIcon('cursor-magnify-plus')
      }
    }
  },

  /**
   * Function for when we hold shift with this tool
   * Note can't determine the event key type
   * It also only updates after mouse event or moves
   * @param {event} event
   * @param {Class} reference to super class
   */
  releaseShift (event, ref) {
    if (event.data.type === 'plus') {
      event.data.magnify.changeToolIcon('cursor-magnify-plus')
    } else {
      event.data.magnify.changeToolIcon('cursor-magnify-minus')
    }
  },

  /**
   * Add box when scrolling over canvas
   * https://stackoverflow.com/questions/3385936/jquery-follow-the-cursor-with-a-div
   */
  popover (event) {
    // check if popover is hidden
    let visible = $('#popover').is(':visible')
    if (!visible) {
      $('#popover').show()
    }

    $('#popover').css({
      left: event.pageX - 100,
      top: event.pageY - 100
    })
  },

  hidePopover (event) {
    $('#popover').hide()
  },

  /** CHANGE THE MAGNIFICATION FUNCTION */
  /*
  https://stackoverflow.com/questions/32540165/how-to-pan-using-paperjs
  https://matthiasberth.com/tech/stable-zoom-and-pan-in-paperjs */
  /**
   * Changes the zoom level of the current view
   * @param {Number} delta contains either a negative or positive number indicates which direction to zoom
   * negative is closer, positive is outward
   * @param {Number} offsetX event offset where we clicked x axis
   * @param {Number} offsetY event offset where we clicked y axis
   * @param {Magnify} magnifyObj reference to the magnify class
   */
  changeZoom (delta, offsetX, offsetY, magnifyObj) {
    let percent = magnifyObj.toolOption.factor
    // if factor is less than 1, error out
    if (percent < 1) {
      alert('Factor can not be lower than one')
      return
    } else if (percent > 100) {
      alert('Factor can not be higher than one hundred')
      return
    }

    // zoom in factor
    let factor = 1 + (percent / 100)

    let viewCenter = paper.view.center
    let mousePosition = new paper.Point(offsetX, offsetY)
    let viewPosition = paper.view.viewToProject(mousePosition)
    let newZoom
    if (delta < 0) {
      newZoom = paper.view.zoom / factor
    } else {
      newZoom = paper.view.zoom * factor
    }

    // scale and update view center
    let beta = paper.view.zoom / newZoom
    let pointC = viewPosition.subtract(viewCenter)
    let newOffset = viewPosition.subtract(pointC.multiply(beta))

    // update the view
    paper.view.zoom = newZoom
    paper.view.center = newOffset
  }

}
