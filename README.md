# gulp-dss [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/) [![Build Status](https://secure.travis-ci.org/DSSWG/gulp-dss.png?branch=master)](http://travis-ci.org/DSSWG/gulp-dss)

## NOTE: This project is still a work-in-progress

A gulp plugin to build UI &amp; UX documentation with the DSS parser

```javascript
var gulp = require( 'gulp' );
var dss = require( 'gulp-dss' );

gulp.task( 'dss', function() {
  return gulp.src( './source/styles/**/*.{sass,scss,less,css,js}' )
    .pipe( dss({ template: './customTemplate/' }))
    .pipe( gulp.dest( './docs/' ) );
});
```

**DSS** Supports CSS, LESS, STYLUS, SASS and SCSS comment block syntax.

## Settings

#### options.parsers

Type: `Object`
Default value: `{}`

An object filled with key value pairs of functions to be used when parsing comment blocks. See the **example** below for more context about how to use these.

**Example**:

```javascript
var gulp = require( 'gulp' );
var dss = require( 'gulp-dss' );

var parsers = { 
  // Finds @link in comment blocks
  link: function( i, line, block ) {

    // Replace link with HTML wrapped version
    var exp = /(b(https?|ftp|file)://[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    line.replace(exp, "<a href='$1'>$1</a>");
    return line;
  }
};

gulp.task( 'dss', function() {
  return gulp.src( './source/styles/**/*.{sass,scss,less,css,js}' )
    .pipe( dss({ parsers: parsers }) )
    .pipe( gulp.dest( './docs/' ) );
});
```

#### options.include_empty_files

Type: `Boolean`
Default value: `false`

Include files without DSS annotations.

### options.template

Type: `String`
Default value: `./templates/default/`

The *default* template (found in `templates/default`) unless you specify otherwise with the `templatePath` option. There is support for `.html`, `.jade` &amp; `handlebars` files by default and any files within the `assets` folder will be synced accordingly. 

**Default Template files:**

    - `index.jade` - a listing of all components, variables &amp; stats
    - `view.jade` - an individual component page 
