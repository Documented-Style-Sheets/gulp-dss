# gulp-dss

A gulp plugin to build UI &amp; UX documentation with the DSS parser

```javascript
var dss = require('gulp-dss');

gulp.task('dss', function() {
  return gulp.src('./source/styles/**/*.{sass,scss}')
    .pipe( dss({ template: path.join(__dirname, './customTemplate/') }))
    .pipe(gulp.dest('ui-docs/'));
});
```

**DSS** Supports CSS, LESS, STYLUS, SASS and SCSS comment block syntax.

## Settings

#### options.parsers

Type: `Object`
Default value: `{}`

An object filled with key value pairs of functions to be used when parsing comment blocks. See the **example** below for more context about how to use these.

**Example**:

#### options.include_empty_files

Type: `Boolean`
Default value: `true`

Include files without DSS annotations.

### options.template

The *default* template (found in `templates/default`) unless you specify otherwise with the `templatePath` option. There is support for `.html`, `.jade` &amp; `handlebars` files by default and any files within the `assets` folder will be synced accordingly. 

**Example**:

#### Default Template files:

`index.jade` - a listing of all components, variables &amp; stats
`view.jade` - an individual component page 
