
import grid from '../grid.js'
/**
 * Object containing function that are used regularly
 */
export default {
  serialize (row, column, layer) {
    return row + '.' + column + '.' + layer
  },

  /**
   * Reinsert triangle back onto paper canvas
   * @param {Triangle} triangle - Our custom triangle class
   * @param {Number} layerID - the id of the layer we are reinserting to
   */
  reinsertTriangle (triangle, layerID) {
    // loop through layers and get layer by id
    let layers = paper.project.layers
    let reInsertLayer
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex++) {
      let layer = layers[layerIndex]
      if (layer._id === layerID) {
        reInsertLayer = layer
        break
      }
    }

    if (reInsertLayer !== undefined) {
      let childIndex = reInsertLayer.children.length
      reInsertLayer.insertChild(childIndex, triangle.path)
    }
  },

  getRowColumn (x, y) {
    // Check if the click is within GRID
    // IF not return
    if (x > grid.totalWidth || y > grid.totalHeight || x < 0 || y < 0) {
      return null
    }

    let gridWidth = grid.squareWidth
    let gridHeight = grid.squareHeight

    let row = Math.floor(y / (gridWidth))
    // validate row, can't go out of bounds
    if (row < 0) {
      row = 0
    } else if (row > grid.grid.length) {
      row = grid.grid.length
    }

    let offset = this._isEven(row) ? 0 : -1 * (gridWidth / 2)
    let column = Math.floor((x + offset) / (gridHeight))

    // validate column
    if (column < 0) {
      column = 0
    } else if (column > grid.grid[0].length) {
      column = grid.grid[0].length
    }

    return { 'row': row, 'column': column }
  },

  _isEven (n) {
    n = Number(n)
    return n === 0 || !!(n && !(n % 2))
  }
}
