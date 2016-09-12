var browserify = require('browserify'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean');

var paths = {
    tpl: './app/**/*.html',
    js: './app/**/*.js',
    sass: './app/**/*.scss'
};

gulp.task('bundle-js', function() {

    browserify('./app/index.js',{
        paths: ['./node_modules', './app']
    })
        .bundle()
        .on('error', function(err){
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('copy-html', function() {

    gulp.src(paths.tpl)
        .pipe(gulp.dest('dist/templates'))

});

gulp.task('bundle-css', function () {
  gulp.src('./app/index.scss')
    .pipe(sass().on('error', sass.logError))
   .pipe(rename('style.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['build'], function() {

    watch(paths.tpl, function(){ 
        gulp.start('copy-html'); 
    });
    watch(paths.sass, function(){ 
        gulp.start('bundle-css'); 
    });
    watch(paths.js, function(){ 
        gulp.start('bundle-js'); 
    });

    nodemon({
        script: './index.js',
        watch: 'index.js',
        legacyWatch: true
    });

});

gulp.task('dev', ['watch']);

gulp.task('clean', function () {
	gulp.src('./dist', {read: false})
		.pipe(clean({force: true}));
});

gulp.task('build', ['bundle-js', 'bundle-css', 'copy-html']);

gulp.task('default', ['build']);