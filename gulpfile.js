const gulp = require("gulp");
const uglify = require("gulp-uglify");
const livereload = require("gulp-livereload");
const concat = require("gulp-concat");
const minifyCss = require("gulp-minify-css");
const autoprefixer = require("gulp-autoprefixer");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const babel = require("gulp-babel");

// file Patch
const dist_PATH = "public/dist";
const scripts_PATH = "public/scripts/**/*.js";
const css_PATH = "public/css/**/*.css";
const sass_PATH = "public/scss/styles.scss";
const reset_PAHT = "public/css/reset.css";
const TEMPLATES_PATH = "templates/**/*.hbs";

// // styles
// gulp.task("styles", function() {
//   console.log("starting");
//   return gulp
//     .src([reset_PAHT, css_PATH])
//     .pipe(
//       plumber(function(err) {
//         console.log("styles error");
//         console.log(err);
//         this.emit("end");
//       })
//     )
//     .pipe(sourcemaps.init())
//     .pipe(autoprefixer())
//     .pipe(concat("styles.css"))
//     .pipe(minifyCss())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest(dist_PATH))
//     .pipe(livereload());
// });

// Handlebars plugins
const handlebars = require("gulp-handlebars");
const handlebarsLib = require("handlebars");
const declare = require("gulp-declare");
const wrap = require("gulp-wrap");
// Sass WorkFlow

gulp.task("styles", function() {
  console.log("starting My Sass");
  return gulp
    .src(sass_PATH)
    .pipe(
      plumber(function(err) {
        console.log("styles error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist_PATH))
    .pipe(livereload());
});
// scripts
gulp.task("scripts", function() {
  console.log("scripting");

  return gulp
    .src(scripts_PATH)
    .pipe(
      plumber(function(err) {
        console.log("scripts error");
        console.log(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["es2015"]
      })
    )
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist_PATH))
    .pipe(livereload());
});

// images
gulp.task("images", function() {
  console.log("images");
});
// Templates
gulp.task("templates", function() {
  return gulp
    .src(TEMPLATES_PATH)
    .pipe(
      handlebars({
        handlebars: handlebarsLib
      })
    )
    .pipe(wrap("Handlebars.template(<%= contents %>)"))
    .pipe(
      declare({
        namespace: "templates",
        noRedeclare: true
      })
    )
    .pipe(concat("templates.js"))
    .pipe(gulp.dest(dist_PATH))
    .pipe(livereload());
});
// default
gulp.task("default", function() {
  console.log("default");
});
// watching
gulp.task("watch", function() {
  console.log("watching");
  require("./server.js");
  livereload.listen({ start: true });
  gulp.watch(scripts_PATH, gulp.series("scripts"));
  // gulp.watch(css_PATH, gulp.series("styles"));
  gulp.watch("public/scss/**/*scss", gulp.series("styles"));
});
