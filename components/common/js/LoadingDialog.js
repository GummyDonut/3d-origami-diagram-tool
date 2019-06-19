/**
 * Note this is a singleton as we only create one of these
 */
export default {
  selector: '#loading-dialog',
  html: 'LoadingDialog.html',
  /**
   * init and append the loader into the selection
   * @param {String} selector jQuery selector
   */
  initDialog (callback) {
    return new Promise((resolve, reject) => {
      try {
        // if it exists don't add, just show
        if ($(this.selector).length > 0) {
          this.openDialog()
          return
        }

        // append new tool options content
        $.get('/components/common/html/' + this.html, (htmlContent) => {
          $('#main-container').append(htmlContent)
          $(this.selector).dialog({
            width: 200,
            height: 300,
            modal: true,
            resizable: false,
            draggable: false,
            closeOnEscape: false,
            // prevent closing of loading dialog manually
            open: function (event, ui) {
              $('.ui-dialog-titlebar-close', ui.dialog | ui).hide()
            }
          })

          // close on start
          this.closeDialog()
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  },
  openDialog () {
    $(this.selector).dialog('open')
  },
  /**
   * Update the loading dialog content
   * @param {JQUERY HTML} html html content that is accepted by $.html function
   */
  updateSlot (html) {
    $(this.selector + ' div.slot').html(html)
  },
  closeDialog () {
    $(this.selector).dialog('close')
  }
}
