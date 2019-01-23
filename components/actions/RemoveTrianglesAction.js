import Action from './Action.js'
import utils from '../lib/utilities.js'

class RemoveTrianglesAction extends Action {
  /**
     * @param {Array of GridSquares} gridSquares - array of grids objects to loop through
     * @param {Array of Triangle} oldTriangles - array of grids triangles that we had removed
     * Note these arrays should be 1 to 1 in terms of order so that we can easily link
     */
  constructor (gridSquares, oldTriangles) {
    super()
    this.gridSquares = gridSquares
    this.oldTriangles = oldTriangles

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
      // store triangle for replacement, when we redo
      // this.replacedTriangle[utils.serialize(gridSquare.row, gridSquare.column)] = gridSquare.triangle

      // actually overwrite triangle
      // gridSquare.triangle.path.remove()
      let childIndex = paper.project.activeLayer.children.length
      let oldTriangle = this.oldTriangles[gridIndex]
      paper.project.activeLayer.insertChild(childIndex, oldTriangle.path)

      // update triangle on grid
      gridSquare.triangle = oldTriangle
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
      gridSquare.triangle.path.remove()
      // let replacementTriangle = this.replacedTriangle[utils.serialize(gridSquare.row, gridSquare.column)]
      // utils.reinsertTriangle(replacementTriangle)
      gridSquare.triangle = null

      // // once we redo remove replaced triangle
      // delete this.replacedTriangle[utils.serialize(gridSquare.row, gridSquare.column)]
    })
    if (!grouped) {
      super.redo()
    }
  }
}

export default RemoveTrianglesAction
