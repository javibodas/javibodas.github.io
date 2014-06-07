#!/bin/bash
npm init

npm install gulp-sass --save-dev
npm install gulp-jade --save-dev
npm install gulp-coffee --save-dev
npm install gulp-jasmine --save-dev

echo 'var gulp = require('gulp'),
    var sass = require('gulp-sass'),
    var coffee = require('gulp-coffee'),
    var jasmine = require('gulp-jasmine');
    gulp.task('sass',function(){});
    gulp.task('coffee',function(){});
    gulp.task('jasmine',function(){});' > gulpfile.js



