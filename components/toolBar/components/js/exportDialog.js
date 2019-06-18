
/**
 * Singleton representing our dialog
 *
 */
export default {

  selector: '#export-as-dialog',
  html: 'exportDialog.html',

  /**
   * Wrapper function for instantiating the dialog on start
   * @returns promise when loading is complete
   */
  initDialog (callback) {
    let loadInHTML = new Promise((resolve, reject) => {
      try {
        // remove all content within
        $(this.selector).remove()

        // append new tool options content
        $.get('/components/toolBar/components/html/' + this.html, (htmlContent) => {
          $('#main-container').append(htmlContent)
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })

    loadInHTML.then(() => {
      // instantiate the dialog
      $(this.selector).dialog({
        minWidth: 300,
        minHeight: 200
      })
    })

    return loadInHTML
  },
  /**
   * Wrapper function for opening the dialog
   */
  openDialog () {
    $('#export-as-dialog').dialog('open')
  },
  /**
   * Wrapper function for closing the dialog
   */
  closeDialog () {
    $('#export-as-dialog').dialog('close')
  }
}
