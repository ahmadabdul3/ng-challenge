var gulp = require('gulp'),
    sass = require('gulp-sass'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat');



gulp.task('styles', function() {

	return gulp.src('Src/Scss/*.scss')
		.pipe(sass({
			'sourcemap=none': true,
			 errLogToConsole: true
		})).on('error', notify.onError({
	        title: "mistake: ",
	        message: "<%= error.message %>"
	    }))
		//.pipe(concat('main.css'))
		.pipe(gulp.dest('Prod/css/'));

});

gulp.task('html', function() {

	return gulp.src('Src/*.html')
		.pipe(gulp.dest('Prod/'));

});
gulp.task('js', function() {

	return gulp.src('Src/js/*.js')
		.pipe(gulp.dest('Prod/js/'));

});

gulp.task('watch', function() {
	gulp.watch('Src/Scss/*.scss', ['styles']);
	gulp.watch('Src/*.html', ['html']);
	gulp.watch('Src/js/*.js', ['js']);
});