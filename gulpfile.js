'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var posthtml = require('gulp-posthtml');
var includeHtml = require('posthtml-include');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var rsp = require('remove-svg-properties').stream;
var rename = require('gulp-rename');
var del = require('del');
var server = require('browser-sync').create();

gulp.task('style', function () {
  return gulp.src('src/sass/style.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(gulp.dest('build/css'))
      .pipe(minify())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('build/css'))
      .pipe(server.stream());
});

gulp.task('html', function () {
  return gulp.src('src/*.html')
      .pipe(posthtml([
        includeHtml()
      ]))
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('build'))
      .pipe(server.stream());
});

gulp.task('js', function () {
  return gulp.src(['src/js/*.js', '!src/js/*.min.js'])
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('build/js'));
});

gulp.task('sprite', function () {
  return gulp.src('src/img/icon-*.svg')
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename('sprite.svg'))
      .pipe(rsp.remove({
        properties: [rsp.PROPS_FILL]
      }))
      .pipe(gulp.dest('build/img'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('copy', function () {
  return gulp.src([
    'src/fonts/**/*.{woff,woff2}',
    'src/img/**',
    'src/js/**'
  ], {
    base: 'src/'
  })
      .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series('clean', 'copy', 'style', 'sprite', 'js', 'html'));

gulp.task('serve', function (done) {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('src/*.html', gulp.series('html'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  done();
});

gulp.task('images', function () {
  return gulp.src('src/img/**/*.{png,jpg,svg}')
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest('src/img/optimized'));
});

gulp.task('webp', function () {
  return gulp.src('img/**/*.{jpg,png}')
      .pipe(webp({quality: 85}))
      .pipe(gulp.dest('src/img/optimized'));
});
