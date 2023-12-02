// This is a complete rewrite of the gulpfile.js from the original project.
// It uses node v15 and up since newer macbooks require it.

const { src, dest } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

function css() {
  return src("scss/**/*.scss")
    .pipe(sassGlob())
    .pipe(
      sass({
        outputStyle: "compressed",
        includePaths: [
          "node_modules/susy/sass",
          "node_modules/breakpoint-sass/stylesheets/",
        ],
      }).on("error", sass.logError)
    )
    .pipe(sourcemaps.init())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("./css/"));
}

exports.css = css;
