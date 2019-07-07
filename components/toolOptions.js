const containerSelector = '#tool-options-container'
class toolOptions {
  /**
   * @param {String} html - contains html file location
   */
  constructor (options) {
    // Note that the components are loaded all under the components folder of toolOptions
    // So this is the name of the file
    this.html = options.html
    this.optionsTitle = options.optionsTitle
  }
  /**
  * Add the html content
  * @returns Promise for when the tools html content has been loaded
  */
  addToToolOptionBox () {
    return new Promise((resolve, reject) => {
      try {
        // remove all content within
        $(containerSelector).empty()

        // append new tool options content
        $(containerSelector).load('/components/toolOptions/components/' + this.html, () => {
          this.init()
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * Completely remove all content
   */
  removeToolOptionsContent () {
    // remove all content within
    $(containerSelector).empty()
  }

  init () {
    // update title of options
    if (this.optionsTitle) {
      $('#tool-options-container h4.optionsTitle').text(this.optionsTitle)
    }
  }
}

export default toolOptions
