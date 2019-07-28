import GridSquare from './gridSquare.js'
import canvasBorder from './canvasBorder.js'

let DEFAULTVALUES = {
  grid: [],
  squareHeight: 14,
  squareWidth: 14,
  totalHeight: 0,
  totalWidth: 0,
  rowsCount: 0,
  columnsCount: 0,
  visible: true,
  initialized: false // at start is the grid already initialized, changes behaviour of reset
}

export default {

  // Two level array representing the grid system
  // First level represents x coordinate - column
  // Second level represent y coordinate - row
  // Grid is just filled with grid squares
  grid: [],
  squareHeight: 14,
  squareWidth: 14,
  totalHeight: 0,
  totalWidth: 0,
  rowsCount: 0,
  columnsCount: 0,
  visible: true,
  initialized: false, // at start is the grid already initialized, changes behaviour of reset

  /**
   * Function for reset Grid to its basic state, clearing everything
   * Note the behaviour different when reseting vs initializing.
   * In reseting we don't add eventlisteners
   * @param {Object} options represents options for initializing or when reseting
   * reset - boolean
   */
  initGrid (options) {
    // specify defaults if options is null
    if (!options) {
      options = {
        reset: false
      }
    }

    // if we reset we need to clear the content
    if (options.reset) {
      paper.project.clear()
    }

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

    if (!this.initialized) {
      // disable right-click options on canvas
      editorSelect.on('contextmenu', event => event.preventDefault())

      // Create an empty project and a view for the canvas:
      paper.setup(canvas)
    }

    // dimensions of grid (e.g. a 5x10 grid)
    // small note remember that the JS is cached,
    // max we can work with consistently seems to be 100.
    // determine the number of squares to fit inside the grid.
    // We also subtract one to provide a bit of a buffer on the edges
    if (!options.dimensions) {
      // define defaults for dimensions
      options.dimensions = {}
      options.dimensions.rows = Math.floor(parent.height() / this.squareHeight) - 1
      options.dimensions.cols = Math.floor(parent.width() / this.squareWidth) - 1
    }

    // loop through creating shifted grid element, with squares and store information
    if (options.reset) {
      this.grid = DEFAULTVALUES.grid
    }
    let canvasGrid = this.grid

    // store the number of rows and columns in the grid object
    this.rowsCount = options.dimensions.rows
    this.columnsCount = options.dimensions.cols

    // coordinate of drawing point
    let drawingX = 0
    let drawingY = 0
    let offsetted = false // should we shift
    let offset = this.squareWidth / 2
    for (let rowIndex = 0; rowIndex < this.rowsCount; rowIndex++) {
      for (let columnIndex = 0; columnIndex < this.columnsCount; columnIndex++) {
        let xCoordinate = drawingX + ((offsetted) ? offset : 0)
        let square = new paper.Rectangle(xCoordinate, drawingY, this.squareWidth, this.squareHeight)
        var squarePath = new paper.Path.Rectangle(square)
        squarePath.strokeColor = 'black'
        squarePath.fillColor = 'white'

        // shift right
        drawingX += this.squareWidth
        // store the object
        if (canvasGrid[rowIndex] === undefined) {
          canvasGrid[rowIndex] = []
        }

        // add to editor
        canvasGrid[rowIndex][columnIndex] = new GridSquare({
          'squarePath': squarePath,
          'square': square,
          'row': rowIndex,
          'column': columnIndex
        })
      }

      // shift down, and reset left
      drawingX = 0
      drawingY += this.squareHeight
      offsetted = !offsetted
    }

    // init the canvasBorder
    let canvasX = canvasGrid[0][0].square.rectangle.x
    let canvasY = canvasGrid[0][0].square.rectangle.y
    let lastRow = canvasGrid[canvasGrid.length - 1]
    let lastGridSquareRect = lastRow[lastRow.length - 1].square.rectangle

    // note if the last row is not offsetted then we need to expand the border a bit
    let abitMore = (offsetted) ? Math.floor(this.squareWidth / 2) : 0

    let canvasWidth = (lastGridSquareRect.x + lastGridSquareRect.width + abitMore) - canvasX
    let canvasHeight = (lastGridSquareRect.y + lastGridSquareRect.height) - canvasY
    canvasBorder.init(canvasX, canvasY, canvasWidth, canvasHeight)

    // store the total dimension
    this.totalWidth = canvasWidth
    this.totalHeight = canvasHeight

    // Draw the view now:
    paper.view.draw()

    // initialized
    this.initialized = true
  }
}
