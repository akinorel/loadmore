'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
const rigger = require('gulp-rigger');
const stylish = require('jshint-stylish');

/* run jshint */

gulp.task('hint', () => {
    return gulp.src('web/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

/* build sass */

gulp.task('styles', () => {
    gulp.src('web/styles/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/'));
});

/* build js for client */

gulp.task('js', function () {
    return gulp.src('web/scripts/*.js')
        //.pipe(uglify())
        .pipe(rigger())
        .pipe(gulp.dest('public/scripts/'));
});


/* build css lib for client */

gulp.task('js:lib', () => {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js'
    ])
    .pipe(uglify())
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('public/scripts/'));
});


/* watch changes on client */

gulp.task('watch', () => { 
    gulp.watch('web/styles/**/*.sass', ['styles']);
    gulp.watch('web/scripts/**/*.js', ['hint', 'js']); 
});


gulp.task('build', ['hint', 'styles', 'js', 'js:lib']);
