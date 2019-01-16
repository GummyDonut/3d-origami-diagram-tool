import Action from './Action.js'

class AddTrianglesAction extends Action {
  /**
   * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
   */
  constructor (gridSquares) {
    super()
    this.gridSquares = gridSquares
  }

  undo () {
    // loop through paths and remove them from canvas
    this.gridSquares.forEach(gridSquare => {
      gridSquare.triangle.path.remove()
      gridSquare.triangle = null
    })
  }
}

export default AddTrianglesAction
