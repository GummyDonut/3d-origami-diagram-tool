class LoadingSpinner {
  /**
   * Install the loading spinner into the selector
   * @param {String} selector jQuery selector
   */
  constructor (selector) {
    this.init(selector)
  }

  /**
   * init and append the loader into the selection
   * @param {String} selector jQuery selector
   */
  init (selector) {
    return new Promise((resolve, reject) => {
      try {
        // append new tool options content
        $.get('/components/common/html/LoadingSpinner.html', (htmlContent) => {
          $(selector).append(htmlContent)
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default LoadingSpinner
