import showLayers from './toolBar/showLayers.js'
export default {

  /**
   * Function to call to initialize the toolbar
   */
  init () {
    // place initial checkmarks
    showLayers.initValues()

    // init all event-listeners
    this.initEventListeners()
  },
  initEventListeners () {
    showLayers.initEventListener()
  }
}
