
import LoadingDialogHTML from '../html/LoadingDialog.html'

/**
 * Note this is a singleton as we only create one of these
 */
export default {
  selector: '#loading-dialog',
  htmlContent: LoadingDialogHTML,
  /**
   * init and append the loader into the selection
   * @param {String} selector jQuery selector
   */
  initDialog(callback) {
    return new Promise((resolve, reject) => {
      try {
        // if it exists don't add, just show
        if ($(this.selector).length > 0) {
          this.openDialog()
          return
        }

        $('#main-container').append(this.htmlContent)
        $(this.selector).dialog({
          width: 300,
          height: 150,
          modal: true,
          resizable: false,
          draggable: false,
          closeOnEscape: false,
          // prevent closing of loading dialog manually
          open: (event, ui) => {
            $(this.selector).parent().find('.ui-dialog-titlebar-close').hide()
          }
        })

        // close on start
        this.closeDialog()

        resolve()
      } catch (e) {
        reject(e)
      }
    })
  },

  /**
   * Open dialog with specified options
   * @param {Object} options contains options
   * on how we should render our dialog when opening
   * We have our options here as we reuse the loading dialog
   * for multiple purposes.
   */
  openDialog(options) {
    $(this.selector).dialog('open')
    if (options.title) {
      $(this.selector).dialog('option', 'title', options.title)
    }

    if (options.width) {
      $(this.selector).dialog('option', 'width', options.width)
    }

    if (options.height) {
      $(this.selector).dialog('option', 'height', options.height)
    }

    // update the slot with new html
    if (options.slot) {
      $(this.selector + ' div.slot').html(options.slot)
    }
  },

  /**
   * Update the loading dialog content
   * @param {JQUERY HTML} html html content that is accepted by $.html function
   */
  updateSlot(html) {
    $(this.selector + ' div.slot').html(html)
  },
  closeDialog() {
    $(this.selector).dialog('close')
  }
}
