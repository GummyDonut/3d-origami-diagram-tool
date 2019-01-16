class GridSquare {
  constructor (options) {
    this.square = {
      path: options.squarePath,
      rectangle: options.square
    }
    this.triangle = null
    this.row = options.row // first level
    this.column = options.column // second level
  }
}

export default GridSquare
