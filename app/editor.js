import 'lib/colorpicker/js/colorpicker.js'
import grid from './components/grid.js'
import tools from './components/tools.js'
import globalTools from './components/globalTools.js'
import layerManager from './components/layerManager.js'
import toolBar from './components/toolBar.js'
import loadingDialog from './components/common/js/LoadingDialog.js'
import constants from './components/lib/constants.js'

// due to bug in expose-loader, loading jquery like this
// https://github.com/webpack-contrib/expose-loader/issues/77
// import 'jquery'

import 'styles/editor.css'
import 'styles/toolBar.css'
import 'styles/dialog.css'
import 'styles/layerManager.css'
import 'lib/colorpicker/css/colorpicker.css'

import 'purecss/build/pure-min.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// Note that the paper object is a global object
window.onload = () => {
  // load iconselectmenu function
  // https:// jqueryui.com/selectmenu/#custom_render
  $.widget('custom.iconselectmenu', $.ui.selectmenu, {
    _renderItem: function (ul, item) {
      var li = $('<li>')
      var wrapper = $('<div>', { text: item.label })

      if (item.disabled) {
        li.addClass('ui-state-disabled')
      }

      $('<span>', {
        style: item.element.attr('data-style'),
        'class': item.element.attr('data-class')
      })
        .prependTo(wrapper)

      return li.append(wrapper).appendTo(ul)
    }
  })

  // hide loading and show app
  $('#main-loading').hide()
  $('#main-app').show()

  // At the start determine the window size
  let windowQuery = $(window)
  if (windowQuery.width() < constants.MINWINDOWWIDTH) {
    // remove everything but the dialog, prevent the user from using the app and keep it clean
    $('body').children().not('#blocking-dialog').remove()

    $('#blocking-dialog div.slot').text('Window size too small not optimal for use, please reload with larger screen.')
    $('#blocking-dialog').dialog({
      modal: true,
      closeOnEscape: false,
      open: function (event, ui) {
        $('#blocking-dialog').parent().find('.ui-dialog-titlebar-close').hide()
      }
    })

    // keep center after resize
    $(window).resize(function () {
      $('#blocking-dialog').dialog('option', 'position', { my: 'center', at: 'center', of: window })
    })

    return
  }

  // setup the grid
  grid.initGrid()

  // setup tool event listeners
  tools.init()

  // init event-listeners for the toolbar
  globalTools.init()

  // init layer manager dialog
  layerManager.init()

  // init toolbar
  toolBar.init()

  // init the loading dialog
  loadingDialog.initDialog()

  // attempt to load what's was in last session
  let paperProject = window.localStorage.getItem('paperProject')
  if (paperProject) {
    console.log(paperProject)
  }

  // When people leave the app save what they made
  window.onunload = () => {
    // TODO  change this to our grid object
    window.localStorage.setItem('paperProject', paper.project.exportJSON())
  }
}
