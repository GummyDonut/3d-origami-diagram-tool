import Tool from '../tool.js'
import MagnifyToolOptions from '../toolOptions/magnifyOptions.js'
import MagnifyLibrary from '../lib/magnify.js'

let toolOption = new MagnifyToolOptions()

class MagnifyMinusTool extends Tool {
  constructor() {
    super('#magnify-minus-tool', 'magnifyMinusTool')
    this.toolOption = toolOption
  }

  /**
  * Initialize the tools listeners
  */
  init() {
    // Add event-listener for tools
    this.toolListeners()

    // Minus icon for magnify in
    $('#magnify-minus-tool').on('click', (event) => {
      if (!this.data.active) {
        // this.deActivateTool()
        $('#magnify-minus-tool').addClass('pure-button-active')
        super.changeToolIcon('cursor-magnify-minus')
        this.tool.activate()

        // add options to tool options box
        this.toolOption.addToToolOptionBox()

        // bind box to cursor
        $('#origami-editor').on('mousemove', MagnifyLibrary.popover)
        $('#origami-editor').on('mouseout', MagnifyLibrary.hidePopover)

        // shift key update icon
        $(document).on('keydown', { type: 'minus', magnify: this }, MagnifyLibrary.holdShift)
        $(document).on('keyup', { type: 'minus', magnify: this }, MagnifyLibrary.releaseShift)

        // indicate that the minus tool is now active
        this.data.active = true
      }
      else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Reset all values for the tool
   */
  deActivateTool() {
    $('#magnify-minus-tool').removeClass('pure-button-active')

    // remove box from cursor and additional event-listeners
    if (paper.tool && paper.tool.name !== 'magnifyPlusTool') {
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
  toolListeners() {
    // Create new custom paper tool
    this.tool = new paper.Tool()
    this.tool.name = this.toolname

    this.tool.onMouseDown = (event) => {
      // if left click
      if (event.event.which === 1) {
        if (event.modifiers.shift === true) {
          MagnifyLibrary.changeZoom(1, event.event.offsetX, event.event.offsetY, this)
        } else {
          MagnifyLibrary.changeZoom(-1, event.event.offsetX, event.event.offsetY, this)
        }
      }
    }

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }
}

export default MagnifyMinusTool
