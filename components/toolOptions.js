const containerSelector = '#tool-options-container'
class toolOptions {
  /**
   * @param {Array of Strings} html - contains html elements
   */
  constructor (html) {
    this.html = html
  }
  /**
  * Add the html content
  */
  addToToolOptionBox () {
    // remove all content within
    $(containerSelector).empty()

    // append new tool options content
    $(containerSelector).html(this.html.join(''))
  }

  /**
   * Completely remove all content
   */
  removeToolOptionsContent () {
    // remove all content within
    $(containerSelector).empty()
  }
}

export default toolOptions
