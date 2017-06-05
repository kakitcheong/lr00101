var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	compass = require('gulp-compass'),
	gulpif = require('gulp-if'),
	minifyHTML = require('gulp-minify-html'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	plumber = require('gulp-plumber'),
	bower = require('gulp-bower');

var env,
	jsSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || 'development';

if (env === 'development' ){
	outputDir = 'builds/development/';
	sassStyle = 'expanded';
} else{
	outputDir = 'builds/production/';
	sassStyle = 'compressed';
}

var jsSources = [
	'components/scripts/*.js'
];

var sassSources = ['components/sass/style.scss'];

var htmlSources = [outputDir + '*.html'];

var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

gulp.task('log', function() {
	gutil.log(sassStyle);
});

gulp.task('js', function(){
	gulp.src(jsSources)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(concat('script.js'))
		.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function(){
	gulp.src(sassSources)
		.pipe(plumber())
		.pipe(compass({
			css: 'stylesheets',
			sass: 'components/sass',
			image: outputDir + 'images',
			import_path: [
				'bower_components/foundation-sites/scss',
  				'bower_components/motion-ui/src'
			],
			style: sassStyle,
			require: [
				'modular-scale',
				'scut'
			]
		})
		.on('error', gutil.log))
		//.pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'stylesheets'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch(jsSources, ['js']);
	gulp.watch('components/sass/**/*.scss', ['compass']);
	gulp.watch('builds/development/*.html', ['html']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
});

gulp.task('connect', function(){
	connect.server({
		root: outputDir,
		livereload: true
	})
});

gulp.task('html', function(){
	gulp.src('builds/development/*.html')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulpif(env === 'production', minifyHTML()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('images', function(){
	gulp.src('builds/development/images/**/*.*')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(gulpif(env === 'production', imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false }]
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
		.pipe(connect.reload())
});

gulp.task('bower', function(){
	return bower()
		.pipe(gulp.dest(outputDir + 'bower_components'));
});

gulp.task('default', [ 'js', 'compass', 'connect', 'html', 'images', 'watch'] );