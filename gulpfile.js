const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const minify = require("gulp-minify");
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify-es').default;
const browserSync = require("browser-sync").create();

const style = () => {
    return (
        gulp
        .src("src/scss/style.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("src/build/css/"))
    );
}

const js = () => {
    gulp.src("src/js/**/*.js")
    .pipe(concat("app.js"))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest("src/build/js/"))
}

const watch = () => {
	browserSync.init({ 
		server: {
            baseDir: "./",
            index: "login.html"
        }
    });

    gulp.watch("src/scss/**/*.scss").on("change", gulp.parallel(style, browserSync.reload));
    gulp.watch("src/js/**/*.js").on("change", gulp.parallel(js, browserSync.reload));
    gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.watch = watch;
exports.style = style;
exports.js = js;

exports.default = gulp.parallel(watch);