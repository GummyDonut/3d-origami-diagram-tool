import Tool from '../tool.js'
import MagnifyToolOptions from '../toolOptions/magnifyOptions.js'
import MagnifyLibrary from '../lib/magnify.js'

let toolOption = new MagnifyToolOptions()

class MagnifyPlusTool extends Tool {
  constructor () {
    super('#magnify-plus-tool', 'magnifyPlusTool')
    this.toolOption = toolOption
  }

  /**
  * Initialize the tools listeners
  */
  init () {
    // Add event-listener for tools
    this.toolListeners()

    // Plus icon for magnify in
    $(this.selector).on('click', (event) => {
      if (!this.data.active) {
        // this.deActivateTool()
        $(this.selector).addClass('pure-button-active')
        super.changeToolIcon('cursor-magnify-plus')
        this.tool.activate()

        // add options to tool options box
        this.toolOption.addToToolOptionBox()

        // bind box to cursor
        $('#origami-editor').on('mousemove', MagnifyLibrary.popover)
        $('#origami-editor').on('mouseout', MagnifyLibrary.hidePopover)

        // shift key update icon
        $(document).on('keydown', { type: 'plus', magnify: this }, MagnifyLibrary.holdShift)
        $(document).on('keyup', { type: 'plus', magnify: this }, MagnifyLibrary.releaseShift)

        // indicate that the plus tool is now active
        this.data.active = true
      } else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Reset all values for the tool
   */
  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    // note don't remove listeners for these if opposite is on
    if (paper.tool === null || (paper.tool.name !== 'magnifyMinusTool')) {
      // remove box from cursor and additional event-listeners
      $('#origami-editor').off('mousemove', MagnifyLibrary.popover)
      $('#origami-editor').off('mouseout', MagnifyLibrary.hidePopover)
      $(document).off('keydown', MagnifyLibrary.holdshift)
      $(document).off('keyup', MagnifyLibrary.releaseShift)
      $('#popover').hide()
    }

    super.deActivateTool()
  }

  /**
   * Event listeners to run for the tool
   */
  toolListeners () {
    // Create new custom paper tool
    this.tool = new paper.Tool()
    this.tool.name = this.toolname

    this.tool.onMouseDown = (event) => {
      // if left click
      if (event.event.which === 1) {
        if (event.modifiers.shift === true) {
          MagnifyLibrary.changeZoom(-1, event.event.offsetX, event.event.offsetY, this)
        } else {
          MagnifyLibrary.changeZoom(1, event.event.offsetX, event.event.offsetY, this)
        }
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }
}

export default MagnifyPlusTool
