/**
 * Class for the tool that is used by the program
 */
class tool {
  /**
   * Constructor
   * @param {String} selector JQuery selection for the tool button
   * @param {String} toolname Unique identifier for the tool
   */
  constructor (selector, toolname) {
    this.tool = null
    this.selector = selector
    this.toolname = toolname
    this.toolOption = null
    this.data = {
      active: false
    }
  }

  /**
   * Common function to run when deactivating
   */
  deActivateTool () {
    // note we check for name as we don't wanna disable global of another tool
    if (paper.tool !== null && paper.tool.name === this.tool.name) {
      paper.tool = null
      this.removeToolIcon()
    }

    // remove tool options
    if (this.toolOption !== null) {
      this.toolOption.removeToolOptionsContent()
    }

    // deactivate tool
    this.data.active = false
  }

  /**
   * Function for converting icon back to normal
   */
  removeToolIcon () {
    $('#origami-editor').removeClass()
  }

  /**
   * Function for converting changing the icon
   */
  changeToolIcon (classname) {
    $('#origami-editor').removeClass()
    $('#origami-editor').addClass(classname)
  }

  /**
   * Function to run on all tools for initializing
   */
  init () {
    console.log('Init has not been implemented for ' + this.toolType)
  }
}

export default tool
