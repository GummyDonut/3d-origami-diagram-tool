import Action from './Action.js'
import grid from '../grid.js'
import utils from '../lib/utilities.js'

class AddTrianglesAction extends Action {
  /**
   * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
   */
  constructor (gridSquares) {
    super()
    this.gridSquares = gridSquares

    // store the triangles that were removed
    // key is x.y or row.column
    this.removedTriangles = {}
  }

  /**
   * Undo by removing the triangle that was added
   * Note store the triangle removed for redo
   */
  undo () {
    // loop through paths and remove them from canvas
    this.gridSquares.forEach(gridSquare => {
      gridSquare.triangle.path.remove()

      // store the triangle that was removed
      this.removedTriangles[utils.serialize(gridSquare.row, gridSquare.column)] = gridSquare.triangle

      // update triangle
      gridSquare.triangle = null
    })

    super.undo()
  }

  /**
   * Take stored triangle and add back in
   */
  redo () {
    // loop through gridSquare and re-add to canvas
    this.gridSquares.forEach(gridSquare => {
      let serial = utils.serialize(gridSquare.row, gridSquare.column)
      // readd the triangle
      let triangle = this.removedTriangles[serial]

      utils.reinsertTriangle(triangle)

      // update the triangle on the global grid
      grid.grid[gridSquare.row][gridSquare.column].triangle = triangle

      // remove reference
      delete this.removedTriangles[serial]
    })

    super.redo()
  }
}

export default AddTrianglesAction
