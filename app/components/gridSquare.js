class GridSquare {
  constructor (options) {
    this.square = {
      path: options.squarePath,
      rectangle: options.square
    }
    this.triangles = {} // key is the layer we added the triangle to
    this.row = options.row // first level
    this.column = options.column // second level
  }
}

export default GridSquare
