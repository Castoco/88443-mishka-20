const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");

// Styles

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(sync.stream());
};

exports.html = html;

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html")).on("change", sync.reload);
}

exports.default = gulp.series(
  styles, html, server, watcher
);

//htmlmin
const htmlmin = require('gulp-htmlmin');

const minhtml = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
    .pipe(sync.stream());
};

//js min
var uglify = require('gulp-uglify');

const compress = () => {
  return gulp.src('source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
};


// images
const imagemin = require("gulp-imagemin");

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.mozjpeg({progressive: true}),
      imagemin.svgo()
]))
}

exports.images = images;

const webp = require("gulp-webp");

const createWebp = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 80}))
  .pipe(gulp.dest("source/img"))
  }

exports.webp = createWebp;

const svgstore = require("gulp-svgstore");
const sprite = () => {
  return gulp.src("source/img/sp-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "!source/img/sp-*",
    "source/js/**",
    "source/*.ico"],
    {base: "source"})
    .pipe(gulp.dest("build"));
    };

exports.copy = copy;

const del = require("del");
const clean = () => {
return del("build");
};

exports.clean = clean;

const build = gulp.series(clean, copy, styles, images, createWebp, sprite, minhtml, compress);
exports.build = build;
