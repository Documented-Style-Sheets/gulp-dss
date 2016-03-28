
var gulp = require( 'gulp' )
var dss = require( './' )
var fs = require( 'fs' )

function isDirectory( path ) {
  return fs.lstatSync( path ).isDirectory()
}

exports.DSS = {
  'copy doc assets': function( test ) {
    test.expect( 1 )

    var expects = {
      docs: isDirectory( './docs/' )
    }

    test.equal( expects.docs, true, 'should create the docs directory' )

    test.done()

  }
}
