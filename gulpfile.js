var gulp = require('gulp');
var stylus = require('gulp-stylus');

var stylusGlob = 'app/styles/stylus/**/*.styl';

gulp.task('default', function() {
    // place code for your default task here
});

gulp.task('stylus', function () {
    gulp.src(stylusGlob)
        .pipe(stylus())
        .pipe(gulp.dest('./app/styles'));
});

gulp.task('watch', function () {
    gulp.watch(stylusGlob, ['stylus']);
});