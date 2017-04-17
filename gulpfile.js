var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass');

var jsSources = [
	'components/scripts/untitled.js'
];

sassSources = ['components/sass/style.scss'];

gulp.task('log', function() {
	gutil.log('I am up and running');
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass: 'components/sass',
			css: 'stylesheets',
			image: 'builds/development/images',
			style: 'expanded',
			require: [
				'modular-scale'
			]
		})
		.on('error', gutil.log))
		.pipe(gulp.dest('builds/development/stylesheets'))
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/**/*.scss', ['compass']);
});

// gulp.task('default', )