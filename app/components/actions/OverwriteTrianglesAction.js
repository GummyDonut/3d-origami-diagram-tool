import Action from './Action.js'
import utils from '../lib/utilities.js'

class OverwriteTrianglesAction extends Action {
  /**
   * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
   * @param {Array of Triangle} oldTriangles - array of grids triangles that we had overwritten
   * we will redraw them
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
      let triangle = gridSquare.triangles[this.layerID]
      // store triangle for replacement, when we redo
      this.replacedTriangle[utils.serialize(gridSquare.row, gridSquare.column, this.layerID)] = triangle

      // actually overwrite triangle
      triangle.path.remove()
      let oldTriangle = this.oldTriangles[gridIndex]
      utils.reinsertTriangle(oldTriangle, this.layerID)

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
      let triangle = gridSquare.triangles[this.layerID]
      triangle.path.remove()
      let replacementTriangle = this.replacedTriangle[utils.serialize(gridSquare.row, gridSquare.column, this.layerID)]
      utils.reinsertTriangle(replacementTriangle, this.layerID)
      gridSquare.triangles[this.layerID] = replacementTriangle

      // once we redo remove replaced triangle
      delete this.replacedTriangle[utils.serialize(gridSquare.row, gridSquare.column, this.layerID)]
    })
    if (!grouped) {
      super.redo()
    }
  }
}

export default OverwriteTrianglesAction
