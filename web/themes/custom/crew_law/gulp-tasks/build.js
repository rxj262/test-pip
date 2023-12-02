/**
 * @file
 * Task: Build.
 */

module.exports = function (gulp, plugins, options) {
  "use strict";

  gulp.task(
    "build",
    gulp.series("compile:sass", "minify:css", async function (cb) {
      // Run linting last, otherwise its output gets lost.
    })
  );

  gulp.task(
    "build:dev",
    gulp.series("compile:sass", "minify:css", async function (cb) {
      // Run linting last, otherwise its output gets lost.
    })
  );
};
