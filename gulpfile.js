var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var getBundleName = function () {
    var version = require('./package.json').version;
    var name = require('./package.json').name;
    return version + '.' + name + '.' + 'min';
};

var stylusGlob = './app/styles/stylus/**/*.styl';
var javascriptGlob = './app/scripts/**/*.js';

// By default, run the building task
gulp.task('default', ['dist']);

gulp.task('styles', function () {
    gulp.src(stylusGlob)
        .pipe(stylus())
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('javascript', function() {

    var bundler = browserify({
        entries: ['./app/scripts/app.js'],
        debug: true
    });

    var bundle = function() {
        return bundler
            .bundle()
            .pipe(source(getBundleName() + '.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./dist/js/'));
    };

    return bundle();
});

gulp.task('html', function(){
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});

// Build vendor assets
gulp.task('vendor', function(){
    gulp.src('./app/vendor/**')
        .pipe(gulp.dest('./dist/vendor/'));
});

// Watching several types of resources
gulp.task('watch', function () {
    gulp.watch(stylusGlob, ['styles']);
    gulp.watch(javascriptGlob, ['javascript']);
    gulp.watch('./app/index.html', ['html']);
});

// Running all the task in series
gulp.task('dist', ['styles', 'javascript', 'html', 'vendor']);