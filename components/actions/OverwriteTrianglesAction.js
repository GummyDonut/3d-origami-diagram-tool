import Action from './Action.js'

class OverwriteTrianglesAction extends Action {
  /**
   * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
   * @param {Array of Triangle} oldTriangles - array of grids triangles that we had overwritten
   * we will redraw them
   * Note these arrays should be 1 to 1 in terms of order so that we can easily link
   */
  constructor (gridSquares, oldTriangles) {
    super()
    this.gridSquares = gridSquares
    this.oldTriangles = oldTriangles
  }

  undo () {
    // loop through paths and remove them from canvas
    this.gridSquares.forEach((gridSquare, gridIndex) => {
      gridSquare.triangle.path.remove()
      let childIndex = paper.project.activeLayer.children.length
      let oldTriangle = this.oldTriangles[gridIndex]
      paper.project.activeLayer.insertChild(childIndex, oldTriangle.path)

      // update triangle
      gridSquare.triangle = oldTriangle
    })
  }
}

export default OverwriteTrianglesAction
