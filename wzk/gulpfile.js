"use strict";

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
const connect = require('gulp-connect');

var paths = {
    less: ['./src/less/*.less']
};
gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('./src/css'))
        .pipe(connect.reload());
});
gulp.task('html-1', function () {
    gulp.src('./src/html-1/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(paths.less, ['less']);
    gulp.watch(['./src/html-1/*.html'], ['html-1']);
});

gulp.task('connect', function () {
    connect.server({
        root: 'src',
        livereload: true
    });
});

gulp.task('default', ['less', 'connect', 'watch', 'html-1']);