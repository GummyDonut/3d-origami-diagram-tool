export default {

  /**
   * Initialize the checkmark value
   */
  initValues () {
    // check if the layers toolbar is visible
    let isVisible = $('#layer-manager').is(':visible')

    if (isVisible) {
      $('#tool-bar-showlayers > i').show()
    } else {
      $('#tool-bar-showlayers > i').hide()
    }
  },

  /**
   * Init event listener to hide/show the layer manager toolbox
   */
  initEventListener () {
    $('#tool-bar-showlayers').on('click', function () {
      let isVisible = $('#layer-manager').is(':visible')
      if (isVisible) {
        $('#layer-manager').dialog('close')
        $('#tool-bar-showlayers > i').hide()
      } else {
        $('#layer-manager').dialog('open')
        $('#tool-bar-showlayers > i').show()
      }
    })
  }
}
