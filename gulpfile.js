"use strict"

// -- DEPENDENCIES -------------------------------------------------------------
var gulp    = require('gulp');
var connect = require('gulp-connect');
var gutil   = require('gulp-util');
var pkg     = require('./package.json');


// -- TASKS --------------------------------------------------------------------
gulp.task('webserver', function() {
  connect.server({ port: 8000, root: 'www/', livereload: true });
});

gulp.task('default', function() {
  gulp.run(['webserver']);
});
