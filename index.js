'use strict';

var Buffer = require( 'buffer' ).Buffer
var File = require( 'gulp-util' ).File
var jade = require( 'jade' )
var marked = require( 'marked' )
var handlebars = require( 'handlebars' )
var through = require( 'through' )
var path = require( 'path' )
var dss = require( 'dss' )

function plugin( opts ) {

  if ( opts === undefined ) {
    throw new Error('Missing options')
  }

  var first = null
  var contents = null
  var template = opts.template || path.join(__dirname, 'templates')

  function process( file ) {

    var parseOptions = {}

    dss.parse( file.contents.toString(), parseOptions, function( dssFile ) {

      first = first || file
      contents = contents || []

      if ( isBlank( dssFile ) ) {
        return
      }

      dssFile.blocks.filter( validBlock ).forEach(function( block ) {
        contents.push( jade.render( 'module.html', block ) )
      })

      function isBlank( file ) {
        return file.blocks.length === 0
      }

      function validBlock( block ) {
        return block.name !== undefined
      }

    })
  }

  function endStream() {

    if ( first ) {

      var joinedPath = path.join(first.base, opts.output);
      var newFile = new File({
        cwd: first.cwd,
        base: first.base,
        path: joinedPath,
        contents: new Buffer(wrapContents(contents.join('\n')))
      });

      this.emit( 'data', newFile )
    }

    this.emit( 'end' )
  }

  function wrapContents( content ) {
    return jade.render( '**/*.jade', { content: content  } )
  }

  return through( process, endStream )

}

module.exports = plugin
