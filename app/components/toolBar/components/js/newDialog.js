
/**
 * Singleton representing our dialog
 *
 */
import newDialogHTML from '../html/newDialog.html'
import EditorDialog from './EditorDialog.js'
import layerManager from '@/components/layerManager.js'
import grid from '@/components/grid.js'
class NewDialog extends EditorDialog {
  constructor () {
    super('#new-file-dialog', {
      html: 'newDialog.html',
      component: newDialogHTML
    })
  }

  /**
   * Load in event-listeners for the dialog
   */
  loadEventListeners () {
    $('#new-file-button').on('click', () => {
      let confirmed = confirm('Are you sure you want to create a new file, you will lose any unsaved work?') // eslint-disable-line no-undef

      if (!confirmed) {
        return
      }

      // validate inputs make sure they have correct values
      if (!this.validate()) {
        return
      }

      this.resetEditor()
      this.closeDialog()
    })
  }

  /**
   * Function to reset the editor in it's entirity
   */
  resetEditor () {
    grid.initGrid({
      reset: true,
      dimensions: {
        rows: $('#new-file-rows').val(),
        cols: $('#new-file-cols').val()
      }
    })

    // update layers manager, so that layers are all reset too
    layerManager.draw()
  }

  /**
   * Validate the inputs for new files
   */
  validate () {
    let rows = $('#new-file-rows').val()
    let columns = $('#new-file-cols').val()

    if (rows === undefined || columns === undefined) {
      alert('Rows and columns cannot be empty')
      return false
    }

    if (rows < 1 || columns < 1) {
      alert('Rows and columns must have values greater than one')
      return false
    }

    return true
  }
}

export default new NewDialog()
