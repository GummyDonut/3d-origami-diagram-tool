
/**
 * Object containing function that are used regularly
 */
export default {
  serialize (row, column) {
    return row + '.' + column
  },

  /**
   * Reinsert triangle back onto paper canvas
   * @param {Triangle} triangle - Our custom triangle class
   */
  reinsertTriangle (triangle) {
    let childIndex = paper.project.activeLayer.children.length
    paper.project.activeLayer.insertChild(childIndex, triangle.path)
  }
}
