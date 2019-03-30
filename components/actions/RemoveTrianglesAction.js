import Action from './Action.js'

class RemoveTrianglesAction extends Action {
  /**
     * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
     * @param {Array of Triangle} oldTriangles - array of grids triangles that we had removed
     * @param {Number} layerID - the ID representing the triangle we removed it from
     * Note these arrays should be 1 to 1 in terms of order so that we can easily link
     */
  constructor (gridSquares, oldTriangles, layerID) {
    super()
    this.gridSquares = gridSquares
    this.oldTriangles = oldTriangles
    this.layerID = layerID

    // triangles we are replacing
    this.replacedTriangle = {
    }
  }

  /**
   * Undo the overwrite by removing the existing triangle and placing the old triangle back in
   * @param {Boolean} grouped Indicates that this is part of a group
   */
  undo (grouped) {
    // loop through paths and remove them from canvas
    this.gridSquares.forEach((gridSquare, gridIndex) => {
      let oldTriangle = this.oldTriangles[gridIndex]

      // adds it back onto canvas
      let childIndex = paper.project.activeLayer.children.length
      paper.project.activeLayer.insertChild(childIndex, oldTriangle.path)

      // update triangle on grid
      gridSquare.triangles[this.layerID] = oldTriangle
    })

    if (!grouped) {
      super.undo()
    }
  }

  /**
   * Redo the overwrite by removing the existing triangle and adding back in the triangle
   * that was removed by the undo
   * @param {Boolean} grouped Indicates that this is part of a group
   */
  redo (grouped) {
    this.gridSquares.forEach((gridSquare, gridIndex) => {
      gridSquare.triangles[this.layerID].path.remove()
      gridSquare.triangles[this.layerID] = undefined
    })
    if (!grouped) {
      super.redo()
    }
  }
}

export default RemoveTrianglesAction
