import magnify from './tools/magnify.js'

// Useful docs on tools
// activating tools: https://stackoverflow.com/questions/49215584/toggling-multiple-tools-on-paper-js
// right vs left click: https://stackoverflow.com/questions/1206203/how-to-distinguish-between-left-and-right-mouse-click-with-jquery
export default {
  /*
    Initialize all tools within the project
  */
  init () {
    magnify.init()
  },
  'magnify': magnify
}
