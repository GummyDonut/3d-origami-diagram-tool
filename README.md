# 3d-origami-diagram-tool
Tool for drawing 3d origami diagrams
https://3dorigamitools.netlify.com

###To quickly run dev server
install http-server, package should be dev dependency
`npm install`
Then run the http-server
`node node_modules/http-server/bin/http-server`
or run the npm script
`npm run dev`



### Dependencies
* paperjs
* jquery

**Small note I'm using paperjs directly with javascript so there are a few caveats**
* Register a handler for when the DOM is ready, since we cannot work with the canvas before that.
* Tell the paper object to setup a Project and a View for our canvas. Instead of passing the canvas object, we can also pass the canvas element's ID as a String. In PaperScript, this happens automatically through the canvas="ID" attribute.
* Access all Paper.js classes and objects through the paper object, since they are no longer global.
* Use Math functions instead of operators on Point and Size.
* Draw the view at the end, since that is now only automatically handled when a view.onFrame handler is installed.

### Main Todo list
* Create all the necessary tools
  * ~~Single/Paintbrush(This has been combined into one)~~
    * ~~Add support for mousedragevent~~
    * ~~Only overwrite if triangles are different~~
  * ~~Line tool~~
  * ~~Eraser tool~~
  * ~~Magnify tool~~
    * Reset to zoom factor of one
  * Text tool
  * Square tool
    * Use stroke bounds and line tool to create this, discovered by accident
  * ~~Paint bucket tool~~
    * ~~Simple tutorial : http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/~~ Overly complicated
    * https://www.hackerearth.com/practice/algorithms/graphs/flood-fill-algorithm/tutorial/
  * Arrow Tool - for simply drawing errors
  * Move tool for moving layers, kinda meh on this one
* ~~Show/hide grid~~
* ~~Canvas Border~~
* Button to clear everything out on grid
* Grid options
* Canvas Border options
* Grid dialog on start
* ~~Border around grid to show boundaries~~
* Edit the size of the grid(append/remove)
* Export/Import Image
  * Update the view size to bounds of grid and then toDataURL that
* Export/Import Save file(Might do local save and browser save)
  * AutoSave feature for recovery
* ~~Undo/Redo history~~
  * Actions needed to be added per type
* Full Screen button
* Mouse co-ordinate system, figure out which square you are on
* label indicate size of grid
* Loading Screen if things look funny on start
* Layering and layer manager
  * ~~Add a new layer~~
  * ~~Remove Layer~~
  * ~~Duplicate Layer~~
  * ~~Delete Layer~~
  * ~~Move layer up and down~~
  * ~~Rename Layer - By dialog~~
  * ~~Undo/Redo for layer action~~
* Replace alert functions with custom dialog
* ~~Fix Overwrite on multiple layers grid system.~~
  * ~~This is quite a large fix, now need to keep track of triangles on different layers~~
  * ~~The gridsquare objects needs to be updated to have multiple triangle objects~~
    * ~~Triangles field, object indicating which layer it was added to~~
  * ~~This also means I need to rewrite the layers to use a unique ID, instead of the name, names are now superficial~~
  * ~~Rewrite up and down _index is incorrect value~~ Ended up manually updating _index value
* ~~Color picker https://www.eyecon.ro/colorpicker/~~
  * TODO Convert image to png https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf/3514404#3514404
* Dark THEME IT UP so this application looks sleeker
* Loading screen on start so it's not as ugly
    
### Bug list
* ~~Small Bug where click outside grid throws error in POPOVERCursor.js - essentially better sanity checks~~
* ~~Small bug popover no longer matches size of grid when zoomed in. Need to update it by the zoom factor~~
* ~~Small bug with drawing lines, need to account for zoom factor~~
* ~~Small bug fix needed keep old options after closing and reopening a tool~~
* ~~Bug with bounds of stroke on diagonal lines with widths greater than 4~~
* Small bug large tool size eraser can't erase edge


### Maybe read into for later
* Information about layers, possibly useful for manipulating text, or just simply adding layers
  * http://paperjs.org/tutorials/project-items/project-hierarchy/#active-layer
  * This may be useful for like having a seperate text layer or a seperate grid layer
  * SMALL NOTE - paperjs abuses associative arrays and stores items in arrays both with the key and the index.
    That how they get the name and index thing working

### Cool features for the future
* On smaller screens realign tool set
  * https://www.pixilart.com/draw
* API Gallery to store people's diagrams

### Possible but unlikely improvements
* Get this working with webpack, https://webpack.js.org/guides/getting-started/
  * Note that paperjs and jquery require unique aliases and setup for webpack https://stackoverflow.com/questions/30576192/paper-js-with-webpack
  https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack

### Note the tool has only been tested on latest versions of Google Chrome and Firefox

### Site for reference, what it plans to look like
https://www.pixilart.com/draw
