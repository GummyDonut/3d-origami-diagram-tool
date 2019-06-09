
import Tool from '../tool.js'
import LineOptions from '../toolOptions/LineOptions.js'
import actionStack from '../actionStack.js'
import PopoverCursor from '../lib/PopoverCursor.js'
import utilities from '../lib/utilities.js'
import GroupActions from '../actions/GroupActions.js'
import grid from '../grid.js'

class LineTool extends Tool {
  constructor () {
    super('#line-tool', 'lineTool')

    // no action on popover
    this.popoverMove = new PopoverCursor(new function () { }(), 1)
    this.toolOption = new LineOptions(this.popoverMove)

    // need to store this way so I can unbind properly
    this.popoverFunction = this.popoverMove.popover.bind(this.popoverMove)
    this.hidePopoverFunction = this.popoverMove.hidePopover.bind(this)

    // path that represents the current line we are drawing
    this.line = null

    // set of stroke lines, as strokeWidth is not included in intersections
    this.strokeLines = []
  }

  /**
   * Initialize the tool
   */
  init () {
    // initialize event-listeners for button
    this.buttonEventListener()
    this.toolListeners()
  }

  /**
   * Event-listener for button within toolbox
   */
  buttonEventListener () {
    $(this.selector).on('click', () => {
      if (!this.data.active) {
        super.changeToolIcon('cursor-line')

        $(this.selector).addClass('pure-button-active')

        $('#origami-editor').on('mousemove', this.popoverFunction)
        $('#origami-editor').on('mouseout', this.hidePopoverFunction)

        // // add options to tool options box
        this.toolOption.addToToolOptionBox()

        // reactive tool
        this.tool.activate()
        this.data.active = true
      } else {
        this.deActivateTool()
      }
    })
  }

  /**
   * Event-listener for canvas
   */
  toolListeners () {
    // Create new custom paper tool
    this.tool = new paper.Tool()

    // Tools behave slightly differently with line tool
    // this.tool.onMouseDown = this.popoverMove.isWithinPopover.bind(this.popoverMove)
    // this.tool.onMouseDrag = this.popoverMove.isWithinPopover.bind(this.popoverMove)

    this.tool.onMouseDrag = this.lineDrag.bind(this)
    this.tool.onMouseUp = this.onMouseUp.bind(this)

    // setting this to null makes it inactive on start
    // this is global active tool scope
    paper.tool = null
  }

  /**
   * On down click we need to add a point for
   */
  lineDrag (event) {
    // remove if it exists, so that one line is only
    // visible at a time
    if (this.line != null) {
      this.line.remove()
    }

    // draw the
    this.line = new paper.Path()
    this.line.strokeColor = 'black'
    this.line.add(event.downPoint)
    this.line.add(event.point)
    this.line.strokeWidth = (this.toolOption.toolSize * grid.squareWidth)
  }

  onMouseUp (event) {
    // Get the chance
    let lineDownSquare = utilities.getRowColumn(event.downPoint.x, event.downPoint.y)
    let lineEndSquare = utilities.getRowColumn(event.point.x, event.point.y)

    // if there is no squares to start from screw it and don't draw
    if (lineDownSquare === null || lineEndSquare === null) {
      this.line.remove()
      this.line = null
      return
    }

    // must be more than one square to draw
    if (lineDownSquare.column === lineEndSquare.column && lineDownSquare.row === lineEndSquare.row) {
      this.line.remove()
      this.line = null
      return
    }

    let boundLines = this.createLineStrokes(event)

    // get the bounds of the stroke
    let strokeBounds = this.getBoundOfStroke(boundLines)
    let boundDownSquare = utilities.getRowColumn(strokeBounds.leftBound.x, strokeBounds.leftBound.y)
    let boundEndSquare = utilities.getRowColumn(strokeBounds.rightBound.x, strokeBounds.rightBound.y)

    // between the two squares the one with the lower column value represents
    // the square we will start looping from
    if (boundDownSquare.row < boundEndSquare.row) {
      this.lineInsideSquares(boundDownSquare, boundEndSquare)
    } else {
      this.lineInsideSquares(boundEndSquare, boundDownSquare)
    }

    // once complete remove the line from the screen
    this.line.remove()
    this.line = null

    // remove lines visually from canvas
    this.strokeLines.forEach((strokeLine) => {
      strokeLine.remove()
    })

    // remove bound lines as well
    const boundLinesValues = Object.values(boundLines)
    boundLinesValues.forEach((boundLine) => {
      boundLine.remove()
    })

    this.strokeLines = []
  }

  /**
   * Get the bounds of the stroke
   * @param {*} boundLines
   */
  getBoundOfStroke (boundLines) {
    let smallestX = Number.MAX_SAFE_INTEGER
    let largestX = 0

    let smallestPoint = null
    let largestPoint = null

    for (let boundsProp in boundLines) {
      let boundLine = boundLines[boundsProp]
      if (boundLine.segments[1].point.x > largestX) {
        largestX = boundLine.segments[1].point.x
        largestPoint = boundLine.segments[1].point
      }

      if (boundLine.segments[1].point.x < smallestX) {
        smallestX = boundLine.segments[1].point.x
        smallestPoint = boundLine.segments[1].point
      }
    }

    return {
      leftBound: smallestPoint,
      rightBound: largestPoint
    }
  }

  /**
   * Create a set of lines to represent a change in stroke width
   * Use this group of lines to determine if the squares intersect
   */
  createLineStrokes (event) {
    // TODO KEEP Track so we can remove them later

    // create the clone on the right and left side
    let lineCloneBottomRight = this.line.clone()
    let lineCloneBottomLeft = this.line.clone()
    let lineCloneTopRight = this.line.clone()
    let lineCloneTopLeft = this.line.clone()

    // update to stroke width 1 for debugging purposes as strokewidth
    // cant be calculated in intersects
    lineCloneBottomRight.strokeWidth = 1
    lineCloneBottomLeft.strokeWidth = 1
    lineCloneTopRight.strokeWidth = 1
    lineCloneTopLeft.strokeWidth = 1

    // debugging purposes
    lineCloneBottomRight.strokeColor = 'red'
    lineCloneBottomLeft.strokeColor = 'orange'
    lineCloneTopRight.strokeColor = 'blue'
    lineCloneTopLeft.strokeColor = 'purple'

    // perpendicular
    lineCloneBottomRight.rotate(90, event.downPoint)
    lineCloneBottomLeft.rotate(-90, event.downPoint)

    // rotate 180 so point zero remains attached to main ling
    lineCloneTopLeft.rotate(180)
    lineCloneTopLeft.rotate(90, event.point)
    lineCloneTopRight.rotate(180)
    lineCloneTopRight.rotate(-90, event.point)

    this.shorten(lineCloneBottomRight)
    this.shorten(lineCloneBottomLeft)
    this.shorten(lineCloneTopRight)
    this.shorten(lineCloneTopLeft)

    // This function updates the strokeLines field
    this.drawStrokeSet(lineCloneTopRight, lineCloneBottomRight)
    this.drawStrokeSet(lineCloneTopLeft, lineCloneBottomLeft)

    // return so that we can use to get bounds
    return {
      'bottomRight': lineCloneBottomRight,
      'bottomLeft': lineCloneBottomLeft,
      'topRight': lineCloneTopRight,
      'topLeft': lineCloneTopLeft
    }
  }

  shorten (lineClone) {
    // https://stackoverflow.com/questions/34529248/in-paperjs-is-it-possible-to-set-the-length-of-a-straight-line-path-explicitly
    let vector = lineClone.segments[0].point.subtract(lineClone.segments[1].point)
    let p0 = lineClone.segments[0].point
    let p1 = p0.subtract(vector.multiply(this.toolOption.toolSize / (grid.squareWidth * 4)))
    // let p1 = vector.subtract(vector.length - this.toolOption.toolSize / (grid.squareWidth * 2))

    // update our current line segment to use this
    lineClone.segments[1].point = p1
  }

  /**
   * Using the bottom and top set draw lines used to represent our stroke
   * @param topLine Path object representing our top part of stroke
   * @param bottomLine Path object representing the bottom part of stroke
   */
  drawStrokeSet (topLine, bottomLine) {
    // how much we are moving by
    // Note we keep two different offsets because they can be different to the 100000th of a meter
    // Which causes problems with using getPointAt function
    let offsetTop = topLine.length
    let offsetBottom = bottomLine.length

    // stop when we reached passed the left most side of line
    while (offsetTop > 0 && offsetBottom > 0) {
      // create parallel line set
      let tempClone = this.line.clone()
      tempClone.strokeWidth = 1
      tempClone.segments[0].point = bottomLine.getPointAt(offsetBottom)
      tempClone.segments[1].point = topLine.getPointAt(offsetTop)

      tempClone.strokeColor = 'green'
      offsetTop = offsetTop - (grid.squareWidth)
      offsetBottom = offsetBottom - (grid.squareWidth)

      this.strokeLines.push(tempClone)
    }

    // at the very end push the main line we have as part of the stroke as well
    let tempClone = this.line.clone()
    tempClone.strokeWidth = 1
    this.strokeLines.push(tempClone)
  }

  /**
   * From the startSquare loop through and check if the line is inside the square
   * all the way till the endSquare. If the line is inside the square add a triangle
   */
  lineInsideSquares (startSquare, endSquare) {
    // Get the point to start from horizontally
    let startingColumnNumber
    let endingColumnNumber
    if (startSquare.column < endSquare.column) {
      startingColumnNumber = startSquare.column
      endingColumnNumber = endSquare.column
    } else {
      startingColumnNumber = endSquare.column
      endingColumnNumber = startSquare.column
    }

    let changedSquares = []

    for (let rowIndex = startSquare.row; rowIndex <= endSquare.row; rowIndex++) {
      let gridRow = grid.grid[rowIndex]
      for (let columnIndex = startingColumnNumber; columnIndex <= endingColumnNumber; columnIndex++) {
        let gridSquare = gridRow[columnIndex]

        // loop through lines checking if stroke lines intersect
        for (let strokeIndex = 0; strokeIndex < this.strokeLines.length; strokeIndex++) {
          let strokeLine = this.strokeLines[strokeIndex]
          // check if the line is inside the rectangle
          if (strokeLine.intersects(gridSquare.square.path)) {
            // check if the triangle that is being added should be an overwrite or a normal add
            let actions = utilities.insertTriangle(gridSquare, this.toolOption)
            if (actions !== undefined) {
              changedSquares.push(actions)
            }
            break
          }
        }
      }
    }

    if (changedSquares.length > 0) {
      actionStack.pushToUndo(new GroupActions(changedSquares), 'new')
    }
  }

  deActivateTool () {
    $(this.selector).removeClass('pure-button-active')

    $('#origami-editor').off('mousemove', this.popoverFunction)
    $('#origami-editor').off('mouseout', this.hidePopoverFunction)
    this.hidePopoverFunction()

    super.deActivateTool()
  }
}

/**
 * Tool for clicking the triangle
 */
export default LineTool
