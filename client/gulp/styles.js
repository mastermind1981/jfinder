'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {

	var sassOptions = {
		style: 'expanded'
	};

	var injectFiles = gulp.src([
		paths.src + '/styles/**/*.scss',
		'!' + paths.src + '/styles/vendor/**/*.scss'
	], {
		read: false
	});

	var injectOptions = {
		transform: function (filePath) {
			filePath = filePath.replace(paths.src, '..');
			return '@import \'' + filePath + '\';';
		},
		starttag: '// injector',
		endtag: '// endinjector',
		addRootSlash: false
	};

	var indexFilter = $.filter('app.scss');

	return gulp.src([paths.src + '/app/app.scss', paths.src + '/app/vendor.scss'])
		.pipe(indexFilter)
		.pipe($.inject(injectFiles, injectOptions))
		.pipe(indexFilter.restore())
		.pipe($.sass(sassOptions))

	.pipe($.autoprefixer())
		.on('error', function handleError(err) {
			console.error(err.toString());
			this.emit('end');
		})
		.pipe(gulp.dest(paths.tmp + '/serve/app/'));
});
