var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	compass = require('gulp-compass');

var jsSources = [
	'components/scripts/untitled.js'
];

var sassSources = ['components/sass/style.scss'];

gulp.task('log', function() {
	gutil.log('I am up and running');
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(gulp.dest('builds/development/js'))
});

gulp.task('compass', function(){
	return gulp.src(sassSources)
		.pipe(compass({
			css: 'stylesheets',
			sass: 'components/sass',
			image: 'builds/development/images',
			import_path: [
				'bower_components/foundation-sites/scss',
  				'bower_components/motion-ui/src'
			],
			style: 'expanded',
			require: [
				'modular-scale'
			]
		}))
		.pipe(gulp.dest('builds/development/stylesheets'))
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/**/*.scss', ['compass']);
});

gulp.task('default', ['watch'] );