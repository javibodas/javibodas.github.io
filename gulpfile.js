var gulp = require('gulp'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    jasmine = require('gulp-jasmine');
    

    gulp.task('sass',function(){
	 
	return gulp.src('scss/todo.scss')
	       .pipe(sass())
	       .pipe(gulp.dest('css/')); 	
	
    });
    gulp.task('coffee',function(){});
    gulp.task('jasmine',function(){});


