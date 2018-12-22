import test from './components/test.js'

// Note that the paper object is a global object
$(document).ready(() =>{

    // Get a reference to the canvas object
    var canvas = $('#origami-editor')[0];
    if (canvas === undefined) {
			alert('Could not retrieve canvas, origami editor')	
			return 
    }

    // Create an empty project and a view for the canvas:
		paper.setup(canvas);
		

		// event-listeners
		// Create a simple drawing tool:
		var tool = new paper.Tool();
		var path;

		// Define a mousedown and mousedrag handler
		tool.onMouseDown = function(event) {
			path = new paper.Path();
			path.strokeColor = 'white';
			path.add(event.point);
		}

		tool.onMouseDrag = function(event) {
			path.add(event.point);
		}

    //dimensions of grid (e.g. a 5x10 grid)
    var rows = 5;
    var cols = 10;

    //center coordinates of any circle being drawn
    var x;
    var y;

    //center coordinates of first circle being drawn
    var xstart = 50;
    var ystart = 50;

    // distance between center coordinates
    var xspacing = 100;
    var yspacing = 100;

    var radius = 10;
    var fillColor = 'orange';

    // create grid and draw circles
    for (var row = 1; row <= rows; row++) {
        y = ystart + (row - 1) * yspacing;

        for(var col = 1; col <= cols; col++) {
            x = xstart + (col - 1) * xspacing;
            new paper.Path.Circle(new paper.Point(x, y), radius).fillColor = fillColor;
        }
    }

    // Draw the view now:
    paper.view.draw();
}) 