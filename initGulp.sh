#!/bin/bash
npm init

npm install gulp-sass --save-dev
npm install gulp-jade --save-dev
npm install gulp-coffee --save-dev
npm install gulp-jasmine --save-dev

echo "var gulp = require('gulp'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jasmine = require('gulp-jasmine');
    gulp.task('sass',function(){});
    gulp.task('coffee',function(){});
    gulp.task('jasmine',function(){});" > gulpfile.js



