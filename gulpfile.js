var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');
var del = require('del');

// By default, run the building task
gulp.task('default', ['dist']);

gulp.task('clean', () => {
  return del('dist');
});

gulp.task('clean-javascript', () => {
  return del('dist/js');
});

gulp.task('javascript', ['clean-javascript'], () => {
  return browserify('./app/src/app.js', {
      debug: false
    })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('styles', ['clean'], function() {
  return gulp.src('./app/styles/**/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('html', ['clean'], function() {
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('assets', ['clean'], function() {
  return gulp.src('./app/assets/**/*.json')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('vendor', ['clean', 'assets'], function() {
  return gulp.src('./app/vendor/**/*.js')
    .pipe(gulp.dest('./dist/vendor'));
});

// Watching several types of resources
gulp.task('watch-files', function() {
  gulp.watch('./app/src/**/*.js', ['javascript']);
});

gulp.task('watch', ['dist', 'watch-files']);

gulp.task('dist', ['styles', 'javascript', 'html', 'assets', 'vendor']);

gulp.task('test', () =>
  gulp.src('test/**/*.spec.js', {
    read: false
  })
  // gulp-mocha needs filepaths so you can't have any plugins before it
  .pipe(mocha({
    reporter: 'nyan'
  }))
);