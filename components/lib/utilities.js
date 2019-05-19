
import grid from '../grid.js'
import Triangle from './Triangle.js'
import AddTrianglesAction from '../actions/AddTrianglesAction.js'
import OverwriteTrianglesAction from '../actions/OverwriteTrianglesAction.js'

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

  /**
   * Based on the x and y coordinate return if the row and column on the grid
   * return null if it could not find anything
   * @param {Number} x
   * @param {Number} y
   */
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
  },

  /**
   * Insert the triangle into the gridSquare
   * Note if a triangle already exists do an overwrite action
   * if there is no triangle do an adding action
   * @param {*} gridSquare
   * @param {*} toolOption contains colors and size of triangle
   * @param {*} paramOptions contains our function options
   * {
   *  "noOverwrite": default handled as false, if true we don't allow for overwriting of triangles
   * }
   */
  insertTriangle (gridSquare, toolOption, paramOptions) {
    // Get the triangle on the layer we are currently using
    let activeLayer = paper.project.activeLayer

    // specify defaults
    let options = {
      'noOverwrite': (paramOptions && paramOptions.noOverwrite) ? paramOptions.noOverwrite : false
    }

    let triangle = gridSquare.triangles[activeLayer._id]
    if (triangle === undefined || triangle == null) {
      // adding action
      gridSquare.triangles[activeLayer._id] = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': toolOption.strokeColor,
        'fillColor': toolOption.fillColor,
        'fill': toolOption.fill
      })

      return new AddTrianglesAction([gridSquare], activeLayer._id)
    } else if (!options.noOverwrite) {
      // overwrite action
      // If the gridSquare triangle matches do not redraw
      if (triangle.matches(toolOption)) {
        return
      }

      // If a triangle exist we will overwrite it
      triangle.path.remove()
      let oldTriangle = gridSquare.triangles[activeLayer._id]
      gridSquare.triangles[activeLayer._id] = new Triangle(gridSquare.square.rectangle, {
        'strokeColor': toolOption.strokeColor,
        'fillColor': toolOption.fillColor,
        'fill': toolOption.fill
      })

      // push action onto stack
      return new OverwriteTrianglesAction([gridSquare], [oldTriangle], activeLayer._id)
    }
  }
}
