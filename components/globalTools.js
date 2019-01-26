/**
 * Functions to initiate tools that exist on the page
 * at all times
 */
import actionStack from './actionStack.js'
import grid from './grid.js'
export default {

  /**
   * Function to initiate the tool bar
   */
  init () {
    this.eventListeners()
  },

  /**
   * Add the event-listener to global tools
   */
  eventListeners () {
    // Undo button event-listener
    $('#undo-button').on('click', () => {
      this.undoClick()
    })

    // Redo button event-listener
    $('#redo-button').on('click', () => {
      this.redoClick()
    })

    // add keyboard shortcut for ctrl+z/undo
    $(document).on('keydown', (e) => {
      if (e.ctrlKey && (e.which === 90)) {
        this.undoClick()
      }
    })

    // add keyboard shortcut for ctrl+y/redo
    $(document).on('keydown', (e) => {
      if (e.ctrlKey && (e.which === 89)) {
        this.redoClick()
      }
    })

    $('#showhide-grid-button').on('click', () => {
      if (grid.visible) {
        this.changeGridVisibility(false)
      } else {
        this.changeGridVisibility(true)
      }

      // toggle grid visibility
      grid.visible = !grid.visible
    })
  },

  /**
   * Function to run when we need to undo
   */
  undoClick () {
    let lastAction = actionStack.undoStack.pop()
    if (lastAction !== undefined) {
      lastAction.undo()
    }
  },

  /**
   * Function to run when we need to redo
   */
  redoClick () {
    let lastAction = actionStack.redoStack.pop()
    if (lastAction !== undefined) {
      lastAction.redo()
    }
  },

  /**
   * Change the grid visibility
   * @param {Boolean} visibility - True if grid to make it visible false otherwise
   */
  changeGridVisibility (visibility) {
    let canvasGrid = grid.grid

    // loop through and make all squares invisible
    canvasGrid.forEach(rowElement => {
      rowElement.forEach(gridSquare => {
        gridSquare.square.path.visible = visibility
      })
    })
  }

}
