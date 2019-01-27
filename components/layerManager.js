export default {

  /**
   * Function to start the layer manager
   */
  init () {
    $('#layer-manager').dialog({
      'position': {
        'my': 'right top',
        'at': 'left top',
        'of': $('#tool-options')
      },
      'width': 200,
      'height': 400
    })
  }
}
