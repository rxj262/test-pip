/**
 * @file
 * Task: Build.
 */

module.exports = function (gulp, plugins, options) {
  'use strict';

  gulp.task('build', [
    'compile:sass',
    'minify:css',
  ]);

  gulp.task('build:dev', [
    'compile:sass',
    'minify:css',
  ]);
};
