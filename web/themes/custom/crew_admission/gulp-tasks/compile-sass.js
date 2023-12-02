/**
 * @file
 * Task: Compile: Sass.
 */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('compile:sass', function () {
    return gulp.src([
      options.sass.files
    ])
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sassGlob())
      .pipe(plugins.sass({
        errLogToConsole: true,
        outputStyle: 'expanded'
      }))
      .pipe(plugins.autoprefixer({
        browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7'],
        cascade: false
      }))
      .pipe(plugins.sourcemaps.write())
      .pipe(gulp.dest(options.sass.destination));
  });
};
