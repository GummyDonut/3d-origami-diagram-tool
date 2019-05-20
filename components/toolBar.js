import showLayers from './toolBar/showLayers.js'
import exportBar from './toolBar/exportBar.js'
export default {

  /**
   * Function to call to initialize the toolbar
   */
  init () {
    // place initial checkmarks
    showLayers.initValues()

    // initialize event-listeners
    exportBar.init()

    // init all event-listeners
    this.initEventListeners()
  },
  initEventListeners () {
    showLayers.initEventListener()
  }
}
