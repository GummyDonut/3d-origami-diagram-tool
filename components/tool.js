/**
 * Class for the tool that is used by the program
 */
class tool {
  constructor (toolType) {
    this['tool-type'] = toolType
    this.tool = null
    this.data = {}
  }

  deActivateTool () {
    console.log('Deactivation has not been implemented for ' + this.toolType)
  }

  init () {
    console.log('Init has not been implemented for ' + this.toolType)
  }
}

export default tool
