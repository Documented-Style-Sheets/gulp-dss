'use strict'

var File = require('vinyl')
var path = require('path')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var jade = require('jade')
var marked = require('marked')
var handlebars = require('handlebars')
var through = require('through2')
var fs = require('fs')
var dss = require('dss')

module.exports = function(options) {

  // Setup options
  options = options || {}
  var files = []
  var styleguide = []
  var template = options.template || './templates/default/'
  var parsers = options.parsers || {}
  parsers = Array.prototype.slice.apply(parsers)

  // Register parsers
  parsers.forEach(function (name, callback) {
    dss.parser(name, callback)
  })

  // Process files
  function process (file, encoding, callback) {

    if (file.isNull()) {
      callback(null, file)
      return
    }

    if (file.isStream()) {
      callback(new gutil.PluginError('gulp-dss', 'Streaming not supported'))
      return
    }

    dss.parse(file.contents.toString(), {}, function (parsed) {

      // Add filename
      parsed.file = file.path

      // Generate files for individual blocks
      parsed.blocks.forEach(function (block) {
        console.log( block )
        var contents = jade.renderFile(template + 'view.jade', block)
        var path = file.path + '-' + block.name + '.html'
        var temp = new File({ path: path, contents: new Buffer(contents) })
        callback(null, temp)
      })

      // Add file to styleguide object
      styleguide.push(parsed)

      // Return without the original file
      callback(null, file)

    })

  }

  function end (callback) {

    jade.renderFile(template + 'index.jade', { locals: styleguide })
    callback()

  }

  return through.obj(process, end)
}

