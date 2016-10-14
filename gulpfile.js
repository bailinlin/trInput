/**
 * Created by bailinlin on 16/10/14.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename")

gulp.task('uglify',function () {
    gulp.src('tr-input.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('default',['uglify'])