import grid from './components/grid.js'
import tools from './components/tools.js'

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
  let rows = 36
  let cols = 58

  // get the width and height of the canvas
  let canvasWidth = $('#origami-editor').width()
  let canvasHeight = $('#origami-editor').height()

  let columnWidth = canvasWidth / cols
  let columnHeight = canvasHeight / rows

  // get the smaller value to make a square
  if (columnWidth < columnHeight) {
    columnHeight = columnWidth
  } else {
    columnWidth = columnHeight
  }

  // loop through creating shifted grid element, with squares and store information
  let canvasGrid = grid.grid

  // coordinate of drawing point
  let drawingX = 0
  let drawingY = 0
  let offsetted = false // should we shift
  let offset = columnWidth / 2
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < cols; columnIndex++) {
      let xCoordinate = drawingX + ((offsetted) ? offset : 0)
      let square = new paper.Rectangle(xCoordinate, drawingY, columnWidth, columnHeight)
      var squarePath = new paper.Path.Rectangle(square)
      squarePath.strokeColor = 'black'
      squarePath.fillColor = 'white'

      // shift right
      drawingX += columnWidth
      // store the object
      if (canvasGrid[rowIndex] === undefined) {
        canvasGrid[rowIndex] = []
      }

      // TODO create grid square class
      canvasGrid[rowIndex][columnIndex] = {
        'path': squarePath,
        'rectangle': square,
        'triangle': null
      }
    }

    // shift down, and reset left
    drawingX = 0
    drawingY += columnHeight
    offsetted = !offsetted
  }

  // Draw the view now:
  paper.view.draw()
})
