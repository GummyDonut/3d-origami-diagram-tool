const containerSelector = '#tool-options-container'
class toolOptions {
  /**
   * @param {String} html - contains html file location
   */
  constructor (html) {
    // Note that the components are loaded all under the components folder of toolOptions
    // So this is the name of the file
    this.html = html
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
}

export default toolOptions
