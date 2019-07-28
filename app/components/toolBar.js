import showLayers from './toolBar/showLayers.js'
import fileBar from './toolBar/fileBar.js'
export default {

  /**
   * Function to call to initialize the toolbar
   */
  init () {
    // place initial checkmarks
    showLayers.initValues()

    // initialize event-listeners
    fileBar.init()

    // init all event-listeners
    this.initEventListeners()
  },
  initEventListeners () {
    showLayers.initEventListener()
  }
}
