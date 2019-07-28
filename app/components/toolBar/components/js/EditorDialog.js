
/**
 * Singleton representing our dialog
 */
class editorDialog {
  constructor (selector, options) {
    this.selector = selector
    this.html = options.html
    this.component = options.component
  }
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
        $('#main-container').append(this.component)
        resolve()
      } catch (e) {
        reject(e)
      }
    })

    loadInHTML.then(() => {
      // instantiate the dialog
      $(this.selector).dialog({
        minWidth: 400,
        minHeight: 300
      })

      // load in listener for dialog button
      this.loadEventListeners()
    })

    return loadInHTML
  }

  // children should override content of this method
  loadEventListeners () {
    // do nothing
  }

  /**
   * Wrapper function for opening the dialog
   */
  openDialog () {
    $(this.selector).dialog('open')
  }
  /**
   * Wrapper function for closing the dialog
   */
  closeDialog () {
    $(this.selector).dialog('close')
  }
}

export default editorDialog
