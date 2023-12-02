/**
 * @file
 * Task: Watch.
 */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('watch', ['watch:sass']);

  // gulp.task('watch:js', function () {
  //   return gulp.watch([
  //     options.js.files
  //   ], ['lint:js']);
  // });

  gulp.task('watch:sass', function () {
    return gulp.watch([
      options.sass.files
    ], ['compile:sass', 'minify:css']);
  });
};
