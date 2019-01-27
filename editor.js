import grid from './components/grid.js'
import tools from './components/tools.js'
import GridSquare from './components/gridSquare.js'
import globalTools from './components/globalTools.js'
import canvasBorder from './components/canvasBorder.js'
import layerManager from './components/layerManager.js'

// Note that the paper object is a global object
$(document).ready(() => {
  let editorSelect = $('#origami-editor')
  let parent = editorSelect.parent()

  // Get a reference to the canvas object
  var canvas = editorSelect[0]
  if (canvas === undefined) {
    alert('Could not retrieve canvas, origami editor')
    return
  }

  // TODO resize event resize canvas
  // canvas width must be defined in pixels
  canvas.style.width = parent.width()

  // disable right-click options on canvas
  editorSelect.on('contextmenu', event => event.preventDefault())

  // Create an empty project and a view for the canvas:
  paper.setup(canvas)

  // setup tool event listeners
  tools.init()

  // dimensions of grid (e.g. a 5x10 grid)
  // small note remember that the JS is cached,
  // max we can work with consistently seems to be 100
  let rows = 36
  let cols = 50

  // loop through creating shifted grid element, with squares and store information
  let canvasGrid = grid.grid

  // store the dimensions of grid at top level for easy-access
  grid.squareWidth = 14
  grid.squareHeight = 14

  // coordinate of drawing point
  let drawingX = 0
  let drawingY = 0
  let offsetted = false // should we shift
  let offset = grid.squareWidth / 2
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
      let xCoordinate = drawingX + ((offsetted) ? offset : 0)
      let square = new paper.Rectangle(xCoordinate, drawingY, grid.squareWidth, grid.squareHeight)
      var squarePath = new paper.Path.Rectangle(square)
      squarePath.strokeColor = 'black'
      squarePath.fillColor = 'white'

      // shift right
      drawingX += grid.squareWidth
      // store the object
      if (canvasGrid[rowIndex] === undefined) {
        canvasGrid[rowIndex] = []
      }

      // TODO create grid square class
      canvasGrid[rowIndex][columnIndex] = new GridSquare({
        'squarePath': squarePath,
        'square': square,
        'row': rowIndex,
        'column': columnIndex
      })
    }

    // shift down, and reset left
    drawingX = 0
    drawingY += grid.squareHeight
    offsetted = !offsetted
  }

  // init the canvasBorder
  let canvasX = canvasGrid[0][0].square.rectangle.x
  let canvasY = canvasGrid[0][0].square.rectangle.y
  let lastRow = canvasGrid[canvasGrid.length - 1]
  let lastGridSquareRect = lastRow[lastRow.length - 1].square.rectangle
  let canvasWidth = (lastGridSquareRect.x + lastGridSquareRect.width) - canvasX
  let canvasHeight = (lastGridSquareRect.y + lastGridSquareRect.height) - canvasY
  canvasBorder.init(canvasX, canvasY, canvasWidth, canvasHeight)

  // Draw the view now:
  paper.view.draw()

  // init event-listeners for the toolbar
  globalTools.init()

  // init layer manager dialog
  layerManager.init()
})
