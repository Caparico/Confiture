require('es6-promise').polyfill();
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var rtlcss        = require('gulp-rtlcss');
var rename        = require('gulp-rename');
var plumber       = require('gulp-plumber');
var gutil         = require('gulp-util');

// What happens when an error is detected
var onError = function (err) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
};

// The gulp SASS task pipeline
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(plumber({ errorHandler: onError })) // Output colorful errors on console
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))              // Output LTR stylesheets (style.css)

        .pipe(rtlcss())                     // Convert to RTL
        .pipe(rename({basename: 'rtl'}))  // Rename to rtl.css
        .pipe(gulp.dest('./'));             // Output RTL stylesheets (rtl.css)
});

gulp.task('watch', function() {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);