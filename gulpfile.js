var gulp 		= require('gulp'),
	gulpif 		= require('gulp-if'),
	less 		= require('gulp-less'),
	watch 		= require('gulp-watch'),
	concat 		= require('gulp-concat'),
	flatten 	= require('gulp-flatten'),
	gutil 		= require('gulp-util')
	cache 		= require('gulp-cached'),
	remember 	= require('gulp-remember'),
	babel 		= require("gulp-babel"),
	ngAnnotate  = require('gulp-ng-annotate'),
	minifyCSS 	= require('gulp-minify-css'),
	uglify 		= require('gulp-uglify'),
	size 		= require('gulp-filesize'),
	plumber 	= require('gulp-plumber'),
	notify 		= require('gulp-notify'),
	rename 		= require('gulp-rename'),
	sourcemaps 	= require('gulp-sourcemaps');
	browserSync = require('browser-sync'),
	reload      = browserSync.reload,
	args   		= require('yargs').argv,
	del 		= require('del'),
	path 		= require('path');

var paths = {
	less: 			'src/less',
	js: 			'src/js',
	libs: 			'bower_components',
	output_img: 	'img',
	output_font: 	'fonts',
	output_css: 	'css',
	output_js: 		'js'
};

gulp.task('browser-sync', function() {
	browserSync({
		open: false,
		server: {
			baseDir: "./",
			index: "index.html"
		}
	});
});

gulp.task('clean', function (cb) {
  del([paths.output_css + '/*.css', paths.output_js + '/*.js'], cb);
});

gulp.task('fonts', function () {
	gulp.src([paths.libs + '/**/*.{ttf,woff,eot}'])
	.pipe(flatten())
	.pipe(gulp.dest(paths.output_font));
});

gulp.task('less', function () {
	gulp.src([
		paths.less + '/my-page.less'
	])
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(less())
	.pipe(gulpif(args.prod, minifyCSS()))
	.pipe(sourcemaps.write('./less'))
	.pipe(rename("my-page.min.css"))
	.pipe(size())
	.pipe(gulp.dest(paths.output_css))
	.pipe(reload({stream: true}));
});

gulp.task('libs', function () {
	gulp.src([
		paths.libs + '/randomcolor/randomColor.js',
		paths.libs + '/jquery/dist/jquery.js',
		paths.libs + '/wow/dist/wow.js',
		paths.libs + '/Chart.js/Chart.js',
		paths.libs + '/angular/angular.js',
		paths.libs + '/tc-angular-chartjs/dist/tc-angular-chartjs.js'
	], { base: paths.libs + '/../' })
	.pipe(size())
	.pipe(sourcemaps.init())
	.pipe(concat('libs.min.js'))
	.pipe(gulpif(args.prod, uglify()))
	.pipe(sourcemaps.write("."))
	.pipe(size())
	.pipe(gulp.dest(paths.output_js))
});

gulp.task('app', function () {
	gulp.src([
		paths.js + '/app.js',
		paths.js + '/**/*.js'
	])
	.pipe(cache('js-app')) 
	.pipe(size())
	.pipe(plumber({
		errorHandler: function(error){
			notify.onError('Error: <%= error.message %>')(error);
			gutil.log(error.stack);
			this.emit('end');
		}
	}))
	.pipe(sourcemaps.init())
	.pipe(babel())
	.pipe(ngAnnotate())
	.pipe(remember('js-app'))
	.pipe(concat('my-page.min.js'))
	.pipe(gulpif(args.prod, uglify()))
	.pipe(sourcemaps.write("."))
	.pipe(size())
	.pipe(gulp.dest(paths.output_js))
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch( paths.less	+ '/*.less', ['less']);
	gulp.watch( paths.js 	+ '/**/*.js', ['app', browserSync.reload]);

	gulp.watch("public/partials/**/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['fonts', 'less', 'libs', 'app']);