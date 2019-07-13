import Action from './Action.js'
import grid from '../grid.js'
import utils from '../lib/utilities.js'

class AddTrianglesAction extends Action {
  /**
   * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
   * @param {Number} layerID - The ID of the layer we added the triangle to, usually the active layer
   */
  constructor (gridSquares, layerID) {
    super()
    this.gridSquares = gridSquares
    this.layerID = layerID

    // store the triangles that were removed
    // key is x.y or row.column
    this.removedTriangles = {}
  }

  /**
   * Undo by removing the triangle that was added
   * Note store the triangle removed for redo
   * @param {Boolean} grouped Indicates that this is part of a group
   */
  undo (grouped) {
    // loop through paths and remove them from canvas
    this.gridSquares.forEach(gridSquare => {
      let triangle = gridSquare.triangles[this.layerID]
      triangle.path.remove()

      // store the triangle that was removed
      this.removedTriangles[utils.serialize(gridSquare.row, gridSquare.column, this.layerID)] = triangle

      // update triangle
      gridSquare.triangles[this.layerID] = undefined
    })

    if (!grouped) {
      super.undo()
    }
  }

  /**
   * Take stored triangle and add back in
   * @param {Boolean} grouped Indicates that this is part of a group
   */
  redo (grouped) {
    // loop through gridSquare and re-add to canvas
    this.gridSquares.forEach(gridSquare => {
      let serial = utils.serialize(gridSquare.row, gridSquare.column, this.layerID)
      // readd the triangle
      let triangle = this.removedTriangles[serial]

      utils.reinsertTriangle(triangle, this.layerID)

      // update the triangle on the global grid
      grid.grid[gridSquare.row][gridSquare.column].triangles[this.layerID] = triangle

      // remove reference
      delete this.removedTriangles[serial]
    })

    if (!grouped) {
      super.redo()
    }
  }
}

export default AddTrianglesAction
