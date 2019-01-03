# 3d-origami-diagram-tool
Tool for drawing 3d origami diagrams
https://3dorigamitools.netlify.com

###To quickly run dev server
install http-server
`npm install http-server -g`
Then cd into the folder of interest and run http-server

### Dependencies
* paperjs
* jquery

**Small note I'm using paperjs directly with javascript so there are a few caveats**
* Register a handler for when the DOM is ready, since we cannot work with the canvas before that.
* Tell the paper object to setup a Project and a View for our canvas. Instead of passing the canvas object, we can also pass the canvas element's ID as a String. In PaperScript, this happens automatically through the canvas="ID" attribute.
* Access all Paper.js classes and objects through the paper object, since they are no longer global.
* Use Math functions instead of operators on Point and Size.
* Draw the view at the end, since that is now only automatically handled when a view.onFrame handler is installed.


### Possible but unlikely improvements
* Get this working with webpack, https://webpack.js.org/guides/getting-started/
  * Note that paperjs and jquery require unique aliases and setup for webpack https://stackoverflow.com/questions/30576192/paper-js-with-webpack
  https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack

### Note the tool has only been tested on Google Chrome and Firefox
