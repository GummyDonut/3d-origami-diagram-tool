import loadingSpinnerHTML from '../html/LoadingSpinner.html'

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
        $(selector).append(loadingSpinnerHTML)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default LoadingSpinner
