var browserify = require('browserify'),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    Server = require('karma').Server,
    protractor = require('gulp-protractor').protractor;

var paths = {
    tpl: './app/**/*.html',
    sass: './app/**/*.scss',
    js: './app/**/*.js',
    specs: './app/**/spec.js'
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

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('build', ['bundle-js', 'bundle-css', 'copy-html']);

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
    watch(paths.specs, function(){
        gulp.start('test');
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

gulp.task('test-watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('e2e', function(){
    gulp.src(["./e2e-tests/**/*.js"])
        .pipe(protractor({
            configFile: "./protractor.conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function(e) { throw e })
});

gulp.task('default', ['build']);
